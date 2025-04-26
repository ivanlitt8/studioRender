import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Phone,
  Mail,
  Check,
  X,
  Upload,
  Instagram,
  Facebook,
} from "lucide-react";
import { db } from "../../firebase-config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { supabase } from "../../lib/supabase.js";
import { sendEmail } from "../../lib/email.js";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "application/dwg",
  "application/dxf",
];

// Esquema común para ambos formularios
const baseSchema = {
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  brief: z.string().optional(),
};

// Esquema para el formulario completo
const fullContactSchema = z.object({
  ...baseSchema,
  projectType: z.enum([
    "exterior",
    "interior",
    "urban",
    "landscape",
    "other",
    "complete",
  ]),
  files: z
    .custom<FileList>()
    .refine((files) => files?.length <= 5, "Maximum of 5 files allowed")
    .refine((files) => {
      if (files.length === 0) return true;
      return Array.from(files).every((file) => file.size <= MAX_FILE_SIZE);
    }, "Each file must be less than 10MB")
    .refine((files) => {
      if (files.length === 0) return true;
      return Array.from(files).every((file) =>
        ACCEPTED_FILE_TYPES.includes(file.type)
      );
    }, "Only PDF, JPG, PNG, DWG, and DXF files are allowed")
    .optional(),
});

// Esquema para el formulario simplificado
const simpleContactSchema = z.object({
  ...baseSchema,
});

type FullContactFormData = z.infer<typeof fullContactSchema>;
type SimpleContactFormData = z.infer<typeof simpleContactSchema>;

const projectTypes = [
  { value: "complete", label: "Complete Project" },
  { value: "exterior", label: "Exterior Design" },
  { value: "interior", label: "Interior Design" },
  { value: "urban", label: "Urban Planning" },
  { value: "landscape", label: "Landscape" },
  { value: "other", label: "Other" },
];

export const ContactSection = () => {
  const [activeTab, setActiveTab] = useState<"full" | "simple">("full");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // Formulario completo
  const {
    register: registerFull,
    handleSubmit: handleSubmitFull,
    formState: { errors: errorsFull },
    reset: resetFull,
  } = useForm<FullContactFormData>({
    resolver: zodResolver(fullContactSchema),
  });

  // Formulario simplificado
  const {
    register: registerSimple,
    handleSubmit: handleSubmitSimple,
    formState: { errors: errorsSimple },
    reset: resetSimple,
  } = useForm<SimpleContactFormData>({
    resolver: zodResolver(simpleContactSchema),
  });

  // Verificar configuración de Supabase al montar
  useEffect(() => {
    const checkSupabaseConfig = async () => {
      try {
        // Listar buckets para verificar conexión
        const { data: buckets, error } = await supabase.storage.listBuckets();

        if (error) {
          console.error("Error al conectar con Supabase:", error.message);
        } else {
          console.log(
            "Buckets disponibles en Supabase:",
            buckets.map((b) => b.name)
          );

          // Verificar permisos en el bucket "documents"
          const { data: bucket, error: bucketError } = await supabase.storage
            .from("documents")
            .list();

          if (bucketError) {
            console.error(
              "Error al acceder al bucket 'documents':",
              bucketError.message
            );
          } else {
            console.log("Archivos en bucket 'documents':", bucket);
          }
        }
      } catch (e) {
        console.error("Error al verificar configuración de Supabase:", e);
      }
    };

    checkSupabaseConfig();
  }, []);

  const uploadFiles = async (files: FileList): Promise<string[]> => {
    console.log("Iniciando subida de", files.length, "archivos");
    setUploadProgress(10);

    try {
      const uploadPromises = Array.from(files).map(async (file, index) => {
        console.log(
          `Preparando archivo ${index + 1}/${files.length}:`,
          file.name,
          file.type,
          file.size
        );
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random()
          .toString(36)
          .substring(2)}.${fileExt}`;
        const filePath = `${fileName}`;

        console.log(`Subiendo a ruta: ${filePath}`);
        setUploadProgress(20 + (index / files.length) * 60);

        const { error: uploadError } = await supabase.storage
          .from("documents")
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          console.error("Error al subir archivo:", uploadError);
          throw new Error(`Error uploading file: ${uploadError.message}`);
        }

        console.log("Archivo subido correctamente, obteniendo URL pública");
        const {
          data: { publicUrl },
        } = supabase.storage.from("documents").getPublicUrl(filePath);

        console.log("URL pública obtenida:", publicUrl);
        return publicUrl;
      });

      setUploadProgress(90);
      const results = await Promise.all(uploadPromises);
      console.log("Todas las URLs obtenidas:", results);
      setUploadProgress(100);
      return results;
    } catch (error) {
      console.error("Error en el proceso de subida:", error);
      throw error;
    }
  };

  const onSubmitFull = async (data: FullContactFormData) => {
    setIsSubmitting(true);
    try {
      // Subir archivos si existen
      let fileUrls: string[] = [];

      if (selectedFiles.length > 0) {
        console.log(
          "Archivos seleccionados para subir:",
          selectedFiles.map((f) => f.name)
        );
        const dataTransfer = new DataTransfer();
        selectedFiles.forEach((file) => {
          dataTransfer.items.add(file);
        });
        const fileList = dataTransfer.files;

        fileUrls = await uploadFiles(fileList);
        console.log("URLs de archivos obtenidas:", fileUrls);
      } else {
        console.log("No hay archivos para subir");
      }

      // Crear objeto con los datos del formulario
      const contactData = {
        fullName: data.fullName,
        email: data.email,
        projectType: data.projectType,
        brief: data.brief || "",
        fileUrls: fileUrls,
        createdAt: serverTimestamp(),
      };

      console.log("Datos a guardar en Firestore:", contactData);

      // Guardar en Firestore
      const docRef = await addDoc(collection(db, "contacts"), contactData);
      console.log("Documento creado con ID:", docRef.id);

      // Enviar correo electrónico usando nuestro servicio
      const emailResult = await sendEmail({
        fullName: data.fullName,
        email: data.email,
        projectType: data.projectType,
        brief: data.brief,
        fileUrls: fileUrls,
      });

      if (!emailResult.success) {
        console.warn(
          "El correo electrónico no pudo ser enviado:",
          emailResult.message
        );
        // Continuamos el flujo aunque falle el envío de correo
      } else {
        console.log("Correo electrónico enviado con éxito");
      }

      setSubmitStatus("success");
      setSelectedFiles([]);
      resetFull();
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  const onSubmitSimple = async (data: SimpleContactFormData) => {
    setIsSubmitting(true);
    try {
      // Crear objeto con los datos del formulario simplificado
      const contactData = {
        fullName: data.fullName,
        email: data.email,
        projectType: "Inquiry",
        brief: data.brief || "",
        fileUrls: [],
        createdAt: serverTimestamp(),
      };

      console.log(
        "Datos a guardar en Firestore (formulario simple):",
        contactData
      );

      // Guardar en Firestore
      const docRef = await addDoc(collection(db, "contacts"), contactData);
      console.log("Documento creado con ID:", docRef.id);

      // Enviar correo electrónico usando nuestro servicio
      const emailResult = await sendEmail({
        fullName: data.fullName,
        email: data.email,
        projectType: "Quick Contact",
        brief: data.brief,
        fileUrls: [],
      });

      if (!emailResult.success) {
        console.warn(
          "El correo electrónico no pudo ser enviado:",
          emailResult.message
        );
        // Continuamos el flujo aunque falle el envío de correo
      } else {
        console.log("Correo electrónico enviado con éxito");
      }

      setSubmitStatus("success");
      resetSimple();
    } catch (error) {
      console.error("Error al enviar el formulario simplificado:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onFileInputClick = () => {
    document.getElementById("files")?.click();
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      console.log(
        "Archivos seleccionados manualmente:",
        Array.from(files).map((f) => f.name)
      );
      setSelectedFiles(Array.from(files));
    }
  };

  const handleFileList = (files: FileList) => {
    if (files && files.length > 0) {
      console.log(
        "Archivos procesados:",
        Array.from(files).map((f) => f.name)
      );
      setSelectedFiles(Array.from(files));
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const { files } = e.dataTransfer;
    if (files?.length) {
      const fileInput = document.getElementById("files") as HTMLInputElement;
      if (fileInput) {
        fileInput.files = files;
        handleFileList(files);
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="contact" className="py-20 bg-primary relative overflow-hidden">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="max-w-7xl mx-auto px-4"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair text-white mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto font-inter">
            Ready to bring your architectural vision to life? Contact us today
            and let's create something extraordinary together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-secondary rounded-lg p-8">
              <h3 className="text-2xl font-playfair text-white mb-6">
                Contact Information
              </h3>
              <div className="space-y-6">
                <div className="flex items-center text-gray-300">
                  <Phone className="w-5 h-5 text-accent mr-4" />
                  <span>+61 425 432 846</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Mail className="w-5 h-5 text-accent mr-4" />
                  <span>contact@r3alim.com</span>
                </div>
                <div className="flex items-center justify-center space-x-4 pt-4">
                  <a
                    href="https://www.instagram.com/realim.studio/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-accent transition-colors"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a
                    href="https://www.facebook.com/r3alim"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-accent transition-colors"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form with Tabs */}
          <div className="lg:col-span-2">
            <div className="bg-secondary rounded-lg p-8">
              <h3 className="text-2xl font-playfair text-white mb-6">
                Request Quote
              </h3>

              {/* Tabs */}
              <div className="flex mb-6 border-b border-gray-600">
                <button
                  onClick={() => setActiveTab("full")}
                  className={`px-4 py-2 font-inter ${
                    activeTab === "full"
                      ? "text-accent border-b-2 border-accent"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  Full Project Request
                </button>
                <button
                  onClick={() => setActiveTab("simple")}
                  className={`px-4 py-2 font-inter ${
                    activeTab === "simple"
                      ? "text-accent border-b-2 border-accent"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  Inquiry
                </button>
              </div>

              {/* Full Form */}
              {activeTab === "full" && (
                <form
                  onSubmit={handleSubmitFull(onSubmitFull)}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {/* Project Type */}
                  <div className="col-span-2">
                    <label
                      htmlFor="projectType"
                      className="block text-white font-inter mb-2"
                    >
                      Project Type *
                    </label>
                    <select
                      id="projectType"
                      {...registerFull("projectType")}
                      className="w-full bg-primary/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent"
                    >
                      {projectTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Full Name */}
                  <div className="col-span-2 md:col-span-1">
                    <label
                      htmlFor="fullName"
                      className="block text-white font-inter mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      {...registerFull("fullName")}
                      className={`w-full bg-primary/50 border ${
                        errorsFull.fullName
                          ? "border-red-500"
                          : "border-gray-600"
                      } rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent`}
                    />
                    {errorsFull.fullName && (
                      <p className="mt-1 text-red-500 text-sm">
                        {errorsFull.fullName.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="col-span-2 md:col-span-1">
                    <label
                      htmlFor="email"
                      className="block text-white font-inter mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...registerFull("email")}
                      className={`w-full bg-primary/50 border ${
                        errorsFull.email ? "border-red-500" : "border-gray-600"
                      } rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent`}
                    />
                    {errorsFull.email && (
                      <p className="mt-1 text-red-500 text-sm">
                        {errorsFull.email.message}
                      </p>
                    )}
                  </div>

                  {/* Project Brief */}
                  <div className="col-span-2">
                    <label
                      htmlFor="brief"
                      className="block text-white font-inter mb-2"
                    >
                      Project Brief
                    </label>
                    <textarea
                      id="brief"
                      {...registerFull("brief")}
                      rows={6}
                      className="w-full bg-primary/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent"
                      placeholder="Please describe your project in detail..."
                    />
                  </div>

                  {/* File Upload */}
                  <div className="col-span-2">
                    <label
                      htmlFor="files"
                      className="block text-white font-inter mb-2"
                    >
                      Upload Files (PDF, JPG, PNG, DWG, DXF - Max 10MB each)
                    </label>
                    <div
                      onClick={onFileInputClick}
                      onDragOver={onDragOver}
                      onDrop={onDrop}
                      className={`w-full bg-primary/50 border ${
                        errorsFull.files ? "border-red-500" : "border-gray-600"
                      } rounded-lg px-4 py-6 text-center cursor-pointer hover:border-accent transition-colors relative`}
                    >
                      <input
                        type="file"
                        id="files"
                        {...registerFull("files")}
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png,.dwg,.dxf"
                        className="hidden"
                        onChange={(e) => handleFileChange(e)}
                      />
                      {selectedFiles.length > 0 ? (
                        <div className="space-y-2">
                          {selectedFiles.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-center text-gray-300"
                            >
                              <span className="truncate max-w-xs">
                                {file.name}
                              </span>
                              <span className="ml-2 text-sm">
                                ({(file.size / 1024 / 1024).toFixed(2)} MB)
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-accent mx-auto mb-2" />
                          <p className="text-gray-300">
                            Drag and drop files here or click to browse
                          </p>
                        </>
                      )}
                      {uploadProgress > 0 && uploadProgress < 100 && (
                        <div
                          className="absolute bottom-0 left-0 h-1 bg-accent"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      )}
                    </div>
                    {errorsFull.files && (
                      <p className="mt-1 text-red-500 text-sm">
                        {errorsFull.files.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="col-span-2">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full bg-accent text-white py-4 rounded-lg font-inter 
                        ${
                          isSubmitting
                            ? "opacity-75 cursor-not-allowed"
                            : "hover:bg-accent/90"
                        }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? "Sending..." : "Send Project Request"}
                    </motion.button>
                  </div>
                </form>
              )}

              {/* Simple Form */}
              {activeTab === "simple" && (
                <form
                  onSubmit={handleSubmitSimple(onSubmitSimple)}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {/* Full Name */}
                  <div className="col-span-2 md:col-span-1">
                    <label
                      htmlFor="fullName-simple"
                      className="block text-white font-inter mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName-simple"
                      {...registerSimple("fullName")}
                      className={`w-full bg-primary/50 border ${
                        errorsSimple.fullName
                          ? "border-red-500"
                          : "border-gray-600"
                      } rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent`}
                    />
                    {errorsSimple.fullName && (
                      <p className="mt-1 text-red-500 text-sm">
                        {errorsSimple.fullName.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="col-span-2 md:col-span-1">
                    <label
                      htmlFor="email-simple"
                      className="block text-white font-inter mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email-simple"
                      {...registerSimple("email")}
                      className={`w-full bg-primary/50 border ${
                        errorsSimple.email
                          ? "border-red-500"
                          : "border-gray-600"
                      } rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent`}
                    />
                    {errorsSimple.email && (
                      <p className="mt-1 text-red-500 text-sm">
                        {errorsSimple.email.message}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="col-span-2">
                    <label
                      htmlFor="brief-simple"
                      className="block text-white font-inter mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="brief-simple"
                      {...registerSimple("brief")}
                      rows={6}
                      className="w-full bg-primary/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent"
                      placeholder="Please type your message here..."
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="col-span-2">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full bg-accent text-white py-4 rounded-lg font-inter 
                        ${
                          isSubmitting
                            ? "opacity-75 cursor-not-allowed"
                            : "hover:bg-accent/90"
                        }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </motion.button>
                  </div>
                </form>
              )}
            </div>

            {/* Success/Error Messages */}
            {submitStatus && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 p-4 rounded-lg ${
                  submitStatus === "success"
                    ? "bg-green-500/10 text-green-500"
                    : "bg-red-500/10 text-red-500"
                }`}
              >
                <div className="flex items-center">
                  {submitStatus === "success" ? (
                    <Check className="w-5 h-5 mr-2" />
                  ) : (
                    <X className="w-5 h-5 mr-2" />
                  )}
                  <p>
                    {submitStatus === "success"
                      ? "Message sent successfully! We will contact you soon."
                      : "There was an error sending your message. Please try again."}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
