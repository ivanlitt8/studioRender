import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal = ({ isOpen, onClose }: TermsModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="relative w-full max-w-4xl h-[80vh] bg-secondary rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 bg-black/50 rounded-full p-2 text-white z-10 hover:bg-black transition-colors duration-300"
              onClick={onClose}
              aria-label="Close terms and conditions"
            >
              <X className="w-6 h-6" />
            </button>
            <iframe
              src="https://docs.google.com/document/d/e/2PACX-1vTgxcj3MvP5LytduElf7dBOONmSPPPtPW-NShkoQ3CAxC1PcHX0JKYwYr6bHkoMQA/pub?embedded=true"
              className="w-full h-full"
              title="Terms and Conditions"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
