import React from "react";
import { motion } from "framer-motion";
import aboutImg from "../assets/Myself.jpg";

export const AboutUs=() => {
    const glows = [
        "top-10 left-10 w-[360px] h-[360px] opacity-20 blur-[120px]",
        "bottom-0 right-10 w-[420px] h-[420px] opacity-15 blur-[150px] delay-3000",
        "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] opacity-10 blur-[100px]",
    ];

    const stats = [
        {label : "Experience", value : "Fresher"},
        {label : "Projects", value : "5+ Completed"},
        {label : "Focus", value : "Frontend and More to Explore"},
        {label : "Speciality", value : "Coding and Design"},
    ]
    return (
        <>
            <div className='w-full h-screen'>
                <section id="about" className="min-h-screen flex items-center justify-center relative bg-black text-white overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none">
                        {glows.map((glow, index) => (
                            <div key={index} className={`absolute rounded bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] animate-pulse ${glow}`}></div>
                        ))}
                    </div>

                    <div className="relative z-10 max-w-6xl w-full mx-auto px-10 lg:px-12 py-20 flex flex-col gap-12">
                        <motion.div className="flex flex-col md:flex-row items-center md:items-stretch gap-8"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        //Excutes the Animation only Once.
                        viewport={{ once: true, amount: 0.5 }}>
                            <motion.div className="relative w-[200px] h-[220px] md:w-[220px] md:h-[240px] rounded-2xl hover:scale-105 shadow-2xl bg-gradient-to-r from-[#1cd8d2]/20 to-[302b63]/20 border border-[white] overflow-hidden">
                                <img src={aboutImg} alt="MySelf" className="absolute inset-0" />
                            </motion.div>

                            <div className="flex-1 flex flex-col justify-center text-center md:text-left">
                                <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent
                                bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#1cd8d2]">
                                    Atharva Kailas Kadam
                                </h2>
                                <p className="mt-2 text-lg sm:text-xl text-white/99 font-semibold">
                                    Web Developer
                                </p>
                                <p className="mt-4 text-gray-300 leading-relaxed text-base sm:text-lg max-w-2xl md:max-w-3xl">
                                    'I’m a Frontend-focused developer who enjoys building clean, interactive, and visually engaging web experiences. I work mainly with React, modern CSS, and animation libraries to turn ideas into smooth, user-friendly interfaces. I’m always exploring new technologies and improving my craft through hands-on projects.'
                                </p>
                                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-5 max-w-xl">
                                    {stats.map((stat, index) => (
                                        <motion.div key={index} className="rounded-xl border border-[white]/10 bg-[white]/5 p-4"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4 }}
                                        viewport={{ once: true, amount: 0.5 }}>
                                            <p className="text-sm text-gray-300 font-medium"><u><b>{stat.label}</b></u></p>
                                            <p className="text-base font-semibold text-white/99">{stat.value}</p>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="mt-6 flex flex-col sm:flex-row gap-5 sm:gap-6 justify-center md:justify-start md:justify-start">
                                    <a href="#projects" className="inline-flex items-center justify-center bg-white text-black rounded-lg border border-white px-5 py-3 hover:bg-gray-100 transition-colors">
                                        View Projects
                                    </a>
                                    <a href="#contact" className="inline-flex items-center justify-center rounded-lg border border-white text-white px-5 py-3 hover:bg-white/10 transition-colors">
                                        Get In Touch
                                    </a>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div className="text-center md:text-left"
                        initial={{opacity:0, x: -30}}
                        whileInView={{opacity:1, x:0}}
                        transition={{duration:0.6}}
                        viewport={{once:true, amount:0.4}}>
                            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                                About Me
                            </h3>
                            <p className="text-gray-300 leading-relaxed text-bae sm:text-lg ">
                                I’m a frontend-focused web developer who loves crafting modern, responsive, and visually appealing user interfaces. Using React, modern CSS, and animations, I turn ideas into smooth and interactive web experiences.                                <br></br>
                                I’m constantly learning and experimenting with new technologies, improving my skills through hands-on projects. My focus is on writing clean code, refining user experience, and turning ideas into polished digital products.
                            </p>
                        </motion.div>

                    </div>
                </section>
            </div>
        </>
    )
}
