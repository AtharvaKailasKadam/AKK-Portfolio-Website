    import React from "react";
    import { motion } from "framer-motion";
    import ParticlesBackground from "../Components/ParticlesBackground";
    import Toast from "../Components/Toast";
    import ContactInput from "../Components/ContactInput";
    import useContactForm from "../hooks/useContactForm";

    export const Contact = () => {
    const {
        formData,
        errors,
        isSubmitting,
        toast,
        handleChange,
        handleSubmit,
        setToast,
    } = useContactForm();

    const glows = [
        "top-10 left-10 w-[360px] h-[360px] opacity-20 blur-[120px]",
        "bottom-0 right-10 w-[420px] h-[420px] opacity-15 blur-[150px]",
        "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] opacity-10 blur-[100px]",
    ];

    return (
        <>
        <section id="contact" className="w-full min-h-screen relative bg-black text-white overflow-hidden py-12 sm:py-20 px-4 sm:px-6 lg:px-12 flex flex-col items-center justify-center">
            <ParticlesBackground />

            <div className="absolute inset-0 pointer-events-none">
            {glows.map((glow, index) => (
                <div
                key={index}
                className={`absolute rounded bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] animate-pulse ${glow}`}
                ></div>
            ))}
            </div>

            <div className="relative z-10 max-w-6xl w-full">
            <motion.div
                className="text-center mb-12 sm:mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, amount: 0.5 }}
            >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#1cd8d2] mb-4">
                <u>GET IN TOUCH</u>
                </h2>
                <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
                Have a question or want to collaborate? I'd love to hear from you. Send me a message and I'll respond as soon as possible.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, amount: 0.5 }}
                className="flex justify-center lg:justify-start"
                >
                <motion.div
                    animate={{
                    y: [0, -20, 0],
                    }}
                    transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    }}
                    className="relative w-[280px] h-[320px] sm:w-[320px] sm:h-[360px] md:w-[360px] md:h-[400px] rounded-2xl overflow-hidden hover:scale-105 shadow-2xl transition-transform duration-300 cursor-pointer"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1cd8d2]/40 to-[#302b63]/40 rounded-2xl border border-[#1cd8d2]/60"></div>
                    <div className="relative w-full h-full bg-gradient-to-br from-[#1cd8d2]/20 to-[#302b63]/20">
                    <img
                        src="https://via.placeholder.com/360x400/1a1a2e/1cd8d2?text=Your+Image+Here"
                        alt="Contact Section"
                        className="w-full h-full object-cover"
                    />
                    </div>
                </motion.div>
                </motion.div>

                <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true, amount: 0.5 }}
                className="flex flex-col"
                >
                <form onSubmit={handleSubmit} className="space-y-6 flex-1">
                    <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleChange}
                    style={{ display: "none" }}
                    tabIndex="-1"
                    autoComplete="off"
                    />

                    <ContactInput
                    label="Full Name"
                    type="text"
                    name="from_name"
                    value={formData.from_name}
                    onChange={handleChange}
                    error={errors.from_name}
                    placeholder="Your name"
                    required
                    disabled={isSubmitting}
                    />

                    <ContactInput
                    label="Email Address"
                    type="email"
                    name="from_email"
                    value={formData.from_email}
                    onChange={handleChange}
                    error={errors.from_email}
                    placeholder="your.email@example.com"
                    required
                    disabled={isSubmitting}
                    />

                    <ContactInput
                    label="Subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    error={errors.subject}
                    placeholder="What would you like to discuss?"
                    required
                    disabled={isSubmitting}
                    />

                    <ContactInput
                    label="Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    error={errors.message}
                    placeholder="Tell me more about your project or inquiry..."
                    isTextarea
                    required
                    disabled={isSubmitting}
                    />

                    <motion.button
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full mt-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#1cd8d2] text-black hover:shadow-lg hover:shadow-[#1cd8d2]/50 transition-all duration-300 disabled:opacity-50"
                    >
                    {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                        </span>
                    ) : (
                        "Send Message"
                    )}
                    </motion.button>

                    <p className="text-xs text-gray-400 text-center">
                    I typically respond within 24 hours
                    </p>
                </form>
                </motion.div>
            </div>
            </div>
        </section>

        {toast && (
            <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
            />
        )}
        </>
    );
    };

