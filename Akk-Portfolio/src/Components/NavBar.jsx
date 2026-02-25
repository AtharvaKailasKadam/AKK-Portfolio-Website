import React, { useEffect } from "react";
import { useState,useRef } from "react";
import logo from "../assets/logo.png"
import { OverlayMenu } from "./OverlayMenu";

import { FiMenu } from "react-icons/fi";


const NavBar =() =>{

    const [menuOpen, setMenuOpen] = useState(false);
    const [visible, setVisible] = useState(true);
    const [forceVisible, setForceVisible] = useState(false);

    const LastScrollY = useRef(0);
    const timerId = useRef(null);

    useEffect(() => {
        const homeSection = document.querySelector("#home")
        if(!homeSection) return;
        const observer = new IntersectionObserver(
        ([entry]) => {
            setForceVisible(entry.isIntersecting);
            if(entry.isIntersecting)
            {
                setForceVisible(true);
                setVisible(true);
            }
            else
            {
                setForceVisible(false);
            }
        },{threshold :0.1}
        );
        if(homeSection)
        {
            observer.observe(homeSection);
        }
        return () => {
            if(homeSection)
            {
                observer.unobserve(homeSection);
            }
        };
    },[]);

    useEffect(() => {
        const handleScroll = () => {
            if(forceVisible)
            {
                setVisible(true);
                if(timerId.current) clearTimeout(timerId.current);
                return;
            }
            const currentScrollY  = window.scrollY;
            if(currentScrollY > LastScrollY.current)
            {
                setVisible(false)
            }
            else
            {
                setVisible(true)
                if(timerId.current) clearTimeout(timerId.current);
                timerId.current= setTimeout(() =>{
                    setVisible(false)
                },3000)
            }
            LastScrollY.current = currentScrollY;

        }
        window.addEventListener("scroll", handleScroll, {passive:true})

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if(timerId.current) clearTimeout(timerId.current);
        };
    },[forceVisible]);


    return (
        <>
            <div>
                <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 z-50 transition-transform duration-300 ${visible ? "translate-y-0":"-translate-y-full"}`}>
                    <div className="flex items-center space-x-2">
                        <img src={logo} alt="logo" className="w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20" />
                        <div>
                            <div className="flex-1 flex top-8  lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
                                <button aria-label="Menu" className="inline-flex items-center justify-center p-2 text-white text-3xl hover:text-gray-300 focus:outline-none">
                                    <FiMenu
                                        aria-hidden="true"
                                        size={24}
                                        onClick={() => setMenuOpen(!menuOpen)}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="hidden sm:block">
                        <a href="#contact"
                        className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-3 sm:px-5 py-2 text-sm sm:text-base rounded-full hover:from-pink-600 hover:to-blue-600 transition-colors duration-300"
                        >
                            Reach Out
                        </a>
                    </div>
                </nav>
            </div>
            <OverlayMenu  isOpen = {menuOpen} onClose={() => setMenuOpen(false)}/>
        </>
    )
}

export default NavBar