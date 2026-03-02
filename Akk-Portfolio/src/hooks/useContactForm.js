import { useState, useCallback, useRef } from "react";
import emailjs from "@emailjs/browser";

// Initialize EmailJS (should be done once)
const initEmailJS = () => {
  const publicKey = import.meta.env.VITE_EMAIL_PUBLIC_KEY;
  if (!publicKey) {
    console.warn("EmailJS public key not configured");
    return;
  }
  emailjs.init(publicKey);
};

const useContactForm = () => {
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    subject: "",
    message: "",
    honeypot: "", // Anti-spam field
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  // Anti-spam: track last submission time
  const lastSubmissionTime = useRef(0);
  const COOLDOWN_PERIOD = 5000; // 5 seconds

  // Validation rules
  const validateForm = useCallback(() => {
    const newErrors = {};

    // Honeypot check (spam protection)
    if (formData.honeypot.trim() !== "") {
      newErrors.honeypot = "Invalid form submission";
      return newErrors;
    }

    // Name validation
    if (!formData.from_name.trim()) {
      newErrors.from_name = "Full name is required";
    } else if (formData.from_name.trim().length < 2) {
      newErrors.from_name = "Name must be at least 2 characters";
    }

    // Email validation
    if (!formData.from_email.trim()) {
      newErrors.from_email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.from_email.trim())) {
        newErrors.from_email = "Please enter a valid email address";
      }
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = "Subject must be at least 3 characters";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    return newErrors;
  }, [formData]);

  // Check cooldown period
  const checkCooldown = useCallback(() => {
    const now = Date.now();
    const timeSinceLastSubmission = now - lastSubmissionTime.current;

    if (timeSinceLastSubmission < COOLDOWN_PERIOD) {
      const remainingTime = Math.ceil(
        (COOLDOWN_PERIOD - timeSinceLastSubmission) / 1000
      );
      return {
        isOnCooldown: true,
        remainingTime,
      };
    }

    return { isOnCooldown: false };
  }, []);

  // Handle input change
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      // Clear error for this field when user starts typing
      if (errors[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    },
    [errors]
  );

  // Reset form
  const resetForm = useCallback(() => {
    setFormData({
      from_name: "",
      from_email: "",
      subject: "",
      message: "",
      honeypot: "",
    });
    setErrors({});
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      // Check cooldown
      const cooldownCheck = checkCooldown();
      if (cooldownCheck.isOnCooldown) {
        setToast({
          message: `Please wait ${cooldownCheck.remainingTime}s before sending another message`,
          type: "error",
        });
        return;
      }

      // Validate form
      const newErrors = validateForm();
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setToast({
          message: "Please fix the errors in your form",
          type: "error",
        });
        return;
      }

      setIsSubmitting(true);

      try {
        // Initialize EmailJS if needed
        initEmailJS();

        const serviceId = import.meta.env.VITE_EMAIL_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAIL_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAIL_PUBLIC_KEY;

        // Validate required environment variables
        if (!serviceId || !templateId || !publicKey) {
          throw new Error("EmailJS configuration is incomplete");
        }

        // Send email using sendForm method
        await emailjs.sendForm(
          serviceId,
          templateId,
          e.target, // Pass the form element directly
          publicKey
        );

        // Success
        lastSubmissionTime.current = Date.now();
        setToast({
          message: "Message sent successfully! I'll get back to you soon.",
          type: "success",
        });

        // Reset form after successful submission
        resetForm();
      } catch (error) {
        console.error("Email sending failed:", error);

        let errorMessage = "Failed to send message. Please try again.";

        if (error.text === "Bad Request (400)") {
          errorMessage = "Invalid email configuration. Please check later.";
        } else if (error.text === "Unauthorized (401)") {
          errorMessage = "Email service configuration error. Please try later.";
        } else if (error.message === "EmailJS configuration is incomplete") {
          errorMessage = "Email service is not properly configured.";
        }

        setToast({
          message: errorMessage,
          type: "error",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [validateForm, checkCooldown, resetForm]
  );

  return {
    formData,
    errors,
    isSubmitting,
    toast,
    handleChange,
    handleSubmit,
    resetForm,
    setToast,
  };
};

export default useContactForm;
