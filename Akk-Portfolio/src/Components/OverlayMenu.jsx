import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { FiX } from "react-icons/fi";

export const OverlayMenu =({ isOpen, onClose }) =>{
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
    const origin = isMobile ? "top right 95% 8%" : "center";
    return (
        <>
            <AnimatePresence>
                {
                    // To check if isOpen is true
                    // To Render the overlay menu only when
                    isOpen && (
                        <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95 flex-col"
                            initial = {{clipPath: `circle(0% at ${origin})`}}
                            animate = {{clipPath:`circle(150% at ${origin})`}}
                            exit = {{clipPath: `circle(0% at ${origin})`}}
                            transition = {{duration:0.9, ease:"0.4,0,0.2,1"}}
                            style={{backgroundColor:"rgba(0,0,0,0.97)"}}
                        >
                            <button onClick={onClose} className="absolute top-4 sm:top-6 right-4 sm:right-6 text-white text-2xl sm:text-3xl" aria-label="Close Menu">
                                <FiX />
                            </button>
                            <ul className="space-y-4 sm:space-y-6 text-center font-semibold tracking-widest text-white hover:cursor-pointer transition-colors duration-300 px-4">
                                {[
                                    "Home",
                                    "About",
                                    "Skills",
                                    "Projects",
                                    "Experience",
                                    "Testimonials",
                                    "Contact"
                                ].map((item, index) => (
                                    <motion.li key={item} initial = {{opacity:0, y:20}} animate = {{opacity:1, y:0}} transition = {{delay:0 + index * 0.1}} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.95 }}>
                                        <a
                                            href={`#${item.toLowerCase()}`}
                                            onClick={onClose}
                                            className="text-2xl sm:text-3xl md:text-4xl text-white hover:text-pink-300 transition-colors duration-300 block py-2"
                                        >
                                            {item}
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    )
                }

            </AnimatePresence>
        </>
    )
}