    import React from "react";
    import { motion, AnimatePresence } from "framer-motion";

    export const CertificatesModal = ({ isOpen, onClose, certificates }) => {
    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 },
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.75, y: 20 },
        visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 30,
        },
        },
        exit: {
        opacity: 0,
        scale: 0.75,
        y: 20,
        transition: { duration: 0.2 },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.3,
        },
        }),
    };

    return (
        <AnimatePresence>
        {isOpen && (
            <>
            {/* Backdrop */}
            <motion.div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                variants={backdropVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={onClose}
            />

            {/* Modal */}
            <motion.div
                className="fixed inset-0 flex items-center justify-center z-50 p-4 sm:p-6 max-h-screen overflow-y-auto"
                variants={backdropVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={onClose}
            >
                <motion.div
                className="bg-black rounded-2xl shadow-2xl w-full max-w-6xl border border-white/10 bg-gradient-to-b from-[#302b63]/20 to-[#1cd8d2]/10 relative my-auto"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
                >
                {/* Glow Effects */}
                <div className="absolute inset-0 pointer-events-none rounded-2xl">
                    <div className="absolute top-0 left-0 w-[300px] h-[300px] opacity-20 blur-[100px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2]"></div>
                    <div className="absolute bottom-0 right-0 w-[300px] h-[300px] opacity-15 blur-[120px] rounded-full bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63]"></div>
                </div>

                {/* Header */}
                <div className="sticky top-0 bg-black/80 backdrop-blur-sm border-b border-white/10 p-4 sm:p-6 flex items-center justify-between z-10 rounded-t-2xl">
                    <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#1cd8d2]">
                    My Certificates
                    </h2>

                    {/* Close Button */}
                    <motion.button
                    onClick={onClose}
                    className="ml-4 p-2 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    >
                    <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                    </motion.button>
                </div>

                {/* Certificates Grid */}
                <div className="p-4 sm:p-8 relative z-10">
                    {certificates.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {certificates.map((cert, index) => (
                        <motion.div
                            key={index}
                            custom={index}
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            className="group rounded-xl overflow-hidden border border-white/10 hover:border-[#1cd8d2]/50 transition-all duration-300"
                        >
                            {/* Certificate Card */}
                            <div className="flex flex-col h-full bg-black/40 hover:bg-black/60 transition-colors backdrop-blur-sm">
                            {/* Image Container */}
                            <motion.div
                                className="relative w-full aspect-square overflow-hidden bg-gradient-to-br from-[#302b63] to-[#1cd8d2] flex-shrink-0"
                                whileHover={{ scale: 1.05 }}
                            >
                                <img
                                src={cert.image}
                                alt={cert.title}
                                className="w-full h-full object-contain p-2 bg-black"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </motion.div>

                            {/* Content */}
                            <div className="flex-1 flex flex-col justify-between p-4 sm:p-5">
                                <div>
                                <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-[#1cd8d2] transition-colors line-clamp-3">
                                    {cert.title}
                                </h3>
                                </div>

                                <div className="mt-3 flex items-center gap-2 text-xs sm:text-sm text-gray-300 border-t border-white/10 pt-3">
                                <svg
                                    className="w-4 h-4 text-[#1cd8d2] flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                                <span className="font-medium">{cert.date}</span>
                                </div>
                            </div>
                            {/* Rank */}
                            <div className="absolute top-2 right-2 text-white text-xs font-medium bg-black/50 px-2 rounded-full font-bold gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2]">
                                {cert.rank}
                            </div>
                            </div>
                        </motion.div>
                        ))}
                    </div>
                    ) : (
                    <div className="text-center py-16">
                        <p className="text-gray-300 text-lg">
                        No certificates yet. Coming soon!
                        </p>
                    </div>
                    )}
                </div>
                </motion.div>
            </motion.div>
            </>
        )}
        </AnimatePresence>
    );
    };
