import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Toast = ({ message, type = "success", onClose }) => {
  React.useEffect(() => {
    if (type === "success") {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [type, onClose]);

  const isSuccess = type === "success";
  const bgColor = isSuccess
    ? "bg-gradient-to-r from-[#1cd8d2]/20 to-[#00bf8f]/20 border-[#1cd8d2]/50"
    : "bg-gradient-to-r from-red-500/20 to-pink-500/20 border-red-500/50";

  const textColor = isSuccess ? "text-[#1cd8d2]" : "text-red-400";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, x: -20 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        exit={{ opacity: 0, y: 20, x: -20 }}
        transition={{ duration: 0.3 }}
        className={`fixed bottom-6 left-6 max-w-sm backdrop-blur-md border rounded-lg px-4 py-4 flex items-start gap-3 ${bgColor} shadow-lg z-50`}
      >
        <div className={`flex-shrink-0 text-xl ${textColor}`}>
          {isSuccess ? (
            <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        <div className="flex-1">
          <p className="text-white text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
          aria-label="Close notification"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default Toast;
