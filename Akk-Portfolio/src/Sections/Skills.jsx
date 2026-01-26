import React from "react";
import { motion } from "framer-motion";
import { languages } from "./Languages";
import { toolsAndOS } from "./Tools";
import { frameworks } from "./Frameworks";

export const Skills = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <>
            <section id="skills" className="h-full w-full pb-8 flex flex-col items-center justify-center relative bg-black text-white overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-white rounded-full bg-gradient-to-r from-[#302b63] via-[#00bd8f] to-[#1cd8d3] blur-[120px] animate-pulse
                    opacity-20"/>
                    <div className="absolute bottom-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-white rounded-full bg-gradient-to-r from-[#302b63] via-[#00bd8f] to-[#1cd8d3] blur-[120px] animate-pulse
                    opacity-20 delay-500"/>
                </div>
                <motion.h2 className="mt-10 text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#1cd8d2] z-10"
                initial={{opacity:0, y:30}}
                animate={{opacity:1, y:0}}
                transition={{duration:0.8, delay:0.1}} >
                    <u>MY SKILLS</u>
                </motion.h2>
                <motion.p className="text-2xl mt-5 sm:text-3xl font-bold bg-clip-text bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] z-10"
                initial={{opacity:0, y:30}}
                animate={{opacity:1, y:0}}
                transition={{duration:0.5, delay:0.1}} >
                    To Build Modern Applications with Modern Technology...!
                </motion.p>

                <div className="mt-10 w-full flex flex-col items-center z-10">
                    {/* Languages */}
                    <motion.div className="w-full max-w-4xl px-4"
                        initial={{opacity:0, y:30}}
                        animate={{opacity:1, y:0}}
                        transition={{duration:0.5, delay:0.2}} >
                        <h3 className="text-3xl mt-5 sm:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63]">
                            Languages
                        </h3>
                        <motion.div className="mt-8 flex flex-wrap items-center justify-center gap-6"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {languages.map((language, index) => (
                                <motion.div key={index} className="group relative flex flex-col items-center justify-center gap-2 p-6 rounded-xl bg-white/10 border border-white/20 shadow-lg backdrop-blur-md hover:bg-white/20 transition-all duration-300 w-36 h-36"
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <img src={language.icon} alt={language.name} className="w-16 h-16" />
                                    <span className="text-lg font-semibold text-white">{language.name}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Frameworks */}
                    <motion.div className="w-full max-w-4xl px-4 mt-12"
                        initial={{opacity:0, y:30}}
                        animate={{opacity:1, y:0}}
                        transition={{duration:0.5, delay:0.3}} >
                        <h3 className="text-3xl mt-5 sm:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63]">
                            Frameworks & Libraries
                        </h3>
                        <motion.div className="mt-8 flex flex-wrap items-center justify-center gap-6"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {frameworks.map((framework, index) => (
                                <motion.div key={index} className="group relative flex flex-col items-center justify-center gap-2 p-6 rounded-xl bg-white/10 border border-white/20 shadow-lg backdrop-blur-md hover:bg-white/20 transition-all duration-300 w-36 h-36"
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <img src={framework.icon} alt={framework.name} className="w-16 h-16" />
                                    <span className="text-lg font-semibold text-white">{framework.name}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Tools & OS */}
                    <motion.div className="w-full max-w-4xl px-4 mt-12"
                        initial={{opacity:0, y:30}}
                        animate={{opacity:1, y:0}}
                        transition={{duration:0.5, delay:0.4}} >
                        <h3 className="text-3xl mt-5 sm:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63]">
                            Tools & OS
                        </h3>
                        <motion.div className="mt-8 flex flex-wrap items-center justify-center gap-6"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {toolsAndOS.map((tool, index) => (
                                <motion.div key={index} className="group relative flex flex-col items-center justify-center gap-2 p-6 rounded-xl bg-white/10 border border-white/20 shadow-lg backdrop-blur-md hover:bg-white/20 transition-all duration-300 w-36 h-36"
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <img src={tool.icon} alt={tool.name} className="w-16 h-16" />
                                    <span className="text-lg font-semibold text-white">{tool.name}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </>
    )
}