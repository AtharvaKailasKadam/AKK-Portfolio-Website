import React from "react";
import { useState } from "react";
import logo from "../assets/logo.png"
import { OverlayMenu } from "./OverlayMenu";

import { FiMenu } from "react-icons/fi";


const NavBar =() =>{

    const [menuOpen, setMenuOpen] = useState(false);

    const [visible, setVisible] = useState(true);


    return (
        <>
            <div>
                <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 z-50 transition-transform duration-300 ${visible ? "translate-y-0":"-translate-y-full"}`}>
                    <div className="flex items-center space-x-2">
                        <img src={logo} alt="logo" className="w-20 h-20" />
                        <div>
                            <div className="fixed top-8  lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
                                <button aria-label="Menu" className="inline-flex items-center justify-center p-2 text-white text-3xl hover:text-gray-300 focus:outline-none">
                                    <FiMenu
                                        aria-hidden="true"
                                        size={30}
                                        onClick={() => setMenuOpen(!menuOpen)}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="lg:block">
                        <a href="#contact"
                        className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-5 py-2 rounded-full hover:from-pink-600 hover:to-blue-600 transition-colors duration-300"
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