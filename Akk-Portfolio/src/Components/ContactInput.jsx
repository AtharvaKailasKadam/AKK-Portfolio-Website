import React from "react";
import { motion } from "framer-motion";

const ContactInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  error,
  placeholder,
  isTextarea = false,
  required = false,
  disabled = false,
}) => {
  const [isFocused, setIsFocused] = React.useState(false);

  const Component = isTextarea ? "textarea" : "input";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      className="relative w-full"
    >
      <label
        htmlFor={name}
        className={`block text-sm font-semibold mb-2 transition-colors ${
          error ? "text-red-400" : "text-white"
        }`}
      >
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>

      <div
        className={`relative overflow-hidden rounded-lg border-2 transition-all duration-300 ${
          error
            ? "border-red-500/50 bg-red-500/5"
            : isFocused
              ? "border-[#1cd8d2] bg-[#1cd8d2]/5"
              : "border-white/20 bg-white/5"
        }`}
      >
        <Component
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          rows={isTextarea ? 5 : undefined}
          aria-label={label}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          className={`relative w-full px-4 py-3 bg-transparent text-white placeholder-gray-500 outline-none transition-all ${
            isTextarea ? "resize-none" : ""
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        />
      </div>

      {error && (
        <motion.p
          id={`${name}-error`}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
          className="text-red-400 text-sm mt-2"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
};

export default ContactInput;
