import { useState, useCallback, useRef } from "react";
import emailjs from "@emailjs/browser";

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
    honeypot: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const lastSubmissionTime = useRef(0);
  const COOLDOWN_PERIOD = 5000;

  const validateForm = useCallback(() => {
    const newErrors = {};

    if (formData.honeypot.trim() !== "") {
      newErrors.honeypot = "Invalid form submission";
      return newErrors;
    }

    if (!formData.from_name.trim()) {
      newErrors.from_name = "Full name is required";
    } else if (formData.from_name.trim().length < 2) {
      newErrors.from_name = "Name must be at least 2 characters";
    }

    if (!formData.from_email.trim()) {
      newErrors.from_email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.from_email.trim())) {
        newErrors.from_email = "Please enter a valid email address";
      }
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = "Subject must be at least 3 characters";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    return newErrors;
  }, [formData]);

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

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      if (errors[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    },
    [errors]
  );

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

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const cooldownCheck = checkCooldown();
      if (cooldownCheck.isOnCooldown) {
        setToast({
          message: `Please wait ${cooldownCheck.remainingTime}s before sending another message`,
          type: "error",
        });
        return;
      }

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
        initEmailJS();

        const serviceId = import.meta.env.VITE_EMAIL_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAIL_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAIL_PUBLIC_KEY;

        if (!serviceId || !templateId || !publicKey) {
          throw new Error("EmailJS configuration is incomplete");
        }

        await emailjs.sendForm(
          serviceId,
          templateId,
          e.target,
          publicKey
        );

        lastSubmissionTime.current = Date.now();
        setToast({
          message: "Message sent successfully! I'll get back to you soon.",
          type: "success",
        });

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