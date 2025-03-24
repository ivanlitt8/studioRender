import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, Mail, MapPin, Upload, Check, X } from "lucide-react";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "application/dwg",
  "application/dxf",
];

const contactSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(2, "Subject is required"),
  projectType: z.enum(["exterior", "interior", "urban", "landscape", "other"]),
  message: z.string().min(10, "Message must be at least 10 characters"),
  brief: z.string().optional(),
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

type ContactFormData = z.infer<typeof contactSchema>;

const projectTypes = [
  { value: "exterior", label: "Exterior Design" },
  { value: "interior", label: "Interior Design" },
  { value: "urban", label: "Urban Planning" },
  { value: "landscape", label: "Landscape" },
  { value: "other", label: "Other" },
];

export const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Form submitted:", data);
      setSubmitStatus("success");
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
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
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Mail className="w-5 h-5 text-accent mr-4" />
                  <span>contact@studio.com</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <MapPin className="w-5 h-5 text-accent mr-4" />
                  <span>123 Design Street, Creative City, 12345</span>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-700">
                <h4 className="text-white font-playfair mb-4">Office Hours</h4>
                <p className="text-gray-300">
                  Monday - Friday: 9:00 AM - 6:00 PM
                  <br />
                  Saturday: By appointment
                  <br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-secondary rounded-lg p-8"
            >
              <h3 className="text-2xl font-playfair text-white mb-6">
                Request A Quote
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    {...register("projectType")}
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
                    {...register("fullName")}
                    className={`w-full bg-primary/50 border ${
                      errors.fullName ? "border-red-500" : "border-gray-600"
                    } rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent`}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-red-500 text-sm">
                      {errors.fullName.message}
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
                    {...register("email")}
                    className={`w-full bg-primary/50 border ${
                      errors.email ? "border-red-500" : "border-gray-600"
                    } rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Subject */}
                {/* <div className="col-span-2">
                  <label
                    htmlFor="subject"
                    className="block text-white font-inter mb-2"
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    {...register("subject")}
                    className={`w-full bg-primary/50 border ${
                      errors.subject ? "border-red-500" : "border-gray-600"
                    } rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent`}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-red-500 text-sm">
                      {errors.subject.message}
                    </p>
                  )}
                </div> */}

                {/* Message */}
                {/* <div className="col-span-2">
                  <label
                    htmlFor="message"
                    className="block text-white font-inter mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    {...register("message")}
                    rows={4}
                    className={`w-full bg-primary/50 border ${
                      errors.message ? "border-red-500" : "border-gray-600"
                    } rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-red-500 text-sm">
                      {errors.message.message}
                    </p>
                  )}
                </div> */}

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
                    {...register("brief")}
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
                    className={`w-full bg-primary/50 border ${
                      errors.files ? "border-red-500" : "border-gray-600"
                    } rounded-lg px-4 py-6 text-center cursor-pointer hover:border-accent transition-colors`}
                  >
                    <input
                      type="file"
                      id="files"
                      {...register("files")}
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png,.dwg,.dxf"
                      className="hidden"
                    />
                    <Upload className="w-8 h-8 text-accent mx-auto mb-2" />
                    <p className="text-gray-300">
                      Drag and drop files here or click to browse
                    </p>
                  </div>
                  {errors.files && (
                    <p className="mt-1 text-red-500 text-sm">
                      {errors.files.message}
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
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </motion.button>
                </div>
              </div>
            </form>

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
