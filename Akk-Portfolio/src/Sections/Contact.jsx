import React from "react";
import ParticlesBackground from "../Components/ParticlesBackground";

export const Contact = () => {
    return (
        <>
            <section id="contact" className="w-full min-h-screen relative bg-black overflow-hidden text-white py-12 sm:py-20 px-4 sm:px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-10">
                <ParticlesBackground />
                <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#1cd8d2] mb-6 sm:mb-8">
                        Let's Connect
                    </h2>
                    <p className="text-gray-300 text-base sm:text-lg md:text-xl mb-8 sm:mb-10 max-w-2xl">
                        I'm always eager to collaborate and discuss new opportunities. Get in touch!
                    </p>
                    <a href="mailto:akkadam.dev@gmail.com" className="px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium text-base sm:text-lg text-white bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] shadow-lg hover:scale-105 transition-all">
                        Contact Me
                    </a>
                </div>
            </section>
        </>
    )
}

