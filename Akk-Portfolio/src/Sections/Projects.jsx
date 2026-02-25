import React from "react";
import { motion } from "framer-motion";

export const Projects = () => {
    const projects = [
        {
            title: "Portfolio Website",
            description: "A modern portfolio website showcasing projects and skills",
            technologies: ["React", "Tailwind CSS", "Framer Motion"],
            link: "#"
        },
        // Add more projects as needed
    ];

    return (
        <>
            <section id="projects" className='w-full min-h-screen relative bg-black text-white overflow-hidden py-12 sm:py-20 px-4 sm:px-6 lg:px-12 flex flex-col items-center justify-center'>
                <motion.h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#1cd8d2] mb-4 px-4"
                    initial={{opacity:0, y:30}}
                    whileInView={{opacity:1, y:0}}
                    transition={{duration:0.6}}
                    viewport={{once:true, amount:0.5}}>
                    <u>MY PROJECTS</u>
                </motion.h2>
                <motion.p className="text-gray-300 text-base sm:text-lg max-w-2xl text-center mb-12 sm:mb-16 px-4"
                    initial={{opacity:0, y:20}}
                    whileInView={{opacity:1, y:0}}
                    transition={{duration:0.6, delay:0.1}}
                    viewport={{once:true, amount:0.5}}>
                    Showcase of my recent work and projects
                </motion.p>
                <div className="w-full max-w-6xl">
                    {/* Projects grid will be displayed here */}
                    <p className="text-center text-gray-400 text-sm sm:text-base">Coming soon...</p>
                </div>
            </section>
        </>
    )
}