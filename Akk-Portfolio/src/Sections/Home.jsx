import React, { useMemo } from "react";
import { motion } from "framer-motion";
import ParticlesBackground from "../Components/ParticlesBackground";
import { FaXTwitter, FaLinkedin, FaGithub} from "react-icons/fa6"
import { href } from "react-router-dom";

const socials =[
    {Icon : FaXTwitter, label : "X", href : "https://x.com/@Atharva_K_Kadam"},
    {Icon : FaLinkedin, label : "Linkedin", href : "https://www.linkedin.com/in/atharva-kadam-176325328"},
    {Icon : FaGithub, label : "Github", href : "https://github.com/AtharvaKailasKadam"}
]


export const Home = () => {
    const roles = useMemo(() => ["Web Developer", "Frontend Developer", "MERN Stack Developer", "CyberSecurity Enthusiast"], []);

    const [index, setIndex] = React.useState(0);
    const[subIndex, setSubIndex] = React.useState(0);
    const[deleting, setDeleting] = React.useState(false);
    React.useEffect(() => {
        const current = roles[index]
        const timeout = setTimeout(() =>{
            if(!deleting && subIndex < current.length)
            {
                setSubIndex( v=> v + 1)
            }
            else if(!deleting && subIndex === current.length)
            {
                setTimeout(() => setDeleting(true), 1200);
            }
            else if(deleting && subIndex > 0)
            {
                setSubIndex(v=> v - 1)
            }
            else if(deleting && subIndex === 0)
            {
                setDeleting (false);
                setIndex( v => (v + 1) % roles.length);
            }
        }, deleting ? 40 : 60);
        return () => clearTimeout(timeout);
    }, [subIndex, index, deleting, roles]);

    return (
        <>
            <section id="home" className='w-full h-screen relative bg-black overflow-hidden'>
                <ParticlesBackground />
                <div className="absolute inset-0">
                    <div className="absolute -top-32 -left-32 w-[70vw] sm:w-[50vw] md:w-[40vw] h-[70vw] sm:h-[50vw] md:h-[40vw] bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2]
                    opacity-30 sm:opacity-20 md:opacity-10 blur-[100px] sm:blur-[100px] md:blur-[150px] rounded-full animate-pulse">
                    </div>
                    <div className="absolute bottom-0 right-8 w-[70vw] sm:w-[50vw] md:w-[40vw] h-[70vw] sm:h-[50vw] md:h-[40vw] bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2]
                    opacity-30 sm:opacity-20 md:opacity-10 blur-[100px] sm:blur-[100px] md:blur-[150px] rounded-full animate-pulse delay-500">
                    </div>
                </div>
                <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-4 grid grid-col-1 lg:grid-cols-2">
                    <div className="flex flex-col justify-center h-full text-center lg:text-left relative">
                        <div className="w-full lg:pr-24 mx-auto max-w[48rem]">
                            <motion.div className="mb-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white tracking-wide min-h-[1.6em]"
                            initial={{opacity:0, y: 12}}
                            animate={{opacity:1, y:0}}
                            transition={{duration:0.6, delay:0.2}}>
                                <span>
                                    {(roles[index].substring(0, subIndex))}
                                    <span className="inline-block w-[2.5px] h-[0.9em] bg-white"></span>
                                </span>
                            </motion.div>

                            <motion.h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text
                            bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] drop-shadow-lg"
                            initial={{opacity:0, y: 24}}
                            animate={{opacity:1, y:0}}
                            transition={{duration:1, delay:0.4}}>
                                Hello...! I'm
                                <br />
                                <span className="text-white font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl lg:whitespace-nowrap"> 
                                    Atharva Kailas Kadam
                                </span>
                            </motion.h1>
                            <motion.p className="mt-6 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0"
                            initial={{opacity:0, y: 20}}
                            animate={{opacity:1, y:0}}
                            transition={{duration:1, delay:0.4}}>
                                I’m a passionate Frontend Developer who enjoys building clean, responsive, and user-friendly web experiences. I focus on turning ideas into simple, efficient interfaces while continuously learning modern web technologies.
                            </motion.p>
                            <motion.div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-4"
                            initial={{opacity:0}}
                            animate={{opacity:1}}
                            transition={{duration:1, delay:0.4}}>
                                <a href="#projects" className="px-6 py-3 rounded-full font-medium text-lg text-white bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] shadow-lg hover:scale-105 transition-all">
                                View My Work</a>
                                <a href="/Resume.pdf" className="px-6 py-3 rounded-full text-lg font-medium text-black bg-white hover:bg-gray-300 hover:scale-105 shadow-lg">
                                My Resume</a>
                            </motion.div>

                            <div className="mt-10 flex gap-5 text-2xl md:text-3xl justify-center lg:justify-start">
                            {socials.map(({Icon, label, href}) => (
                                <motion.a href={href} key={label} className="text-white hover:text-gray-300 transition-colors duration-300 hover:scale-105">
                                    <Icon />
                                </motion.a>
                            ))}

                            </div>

                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}