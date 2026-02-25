import React, { useEffect, useState } from "react";

const CustomCursor = () =>{

    const [position, setPosition] = useState({x:0, y:0});
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if device is mobile
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile, { passive: true });

        const moveHandler = (e) => {
            setPosition({x: e.clientX, y: e.clientY});
        }

        window.addEventListener("mousemove", moveHandler, { passive: true });
        return () => {
            window.removeEventListener("mousemove", moveHandler);
            window.removeEventListener("resize", checkMobile);
        };
    },[]);

    // Don't show custom cursor on mobile/touch devices
    if(isMobile) return null;

    return (
        <>
            <div className = "pointer-events-none fixed inset-0 z-[999999] hidden md:block"
            style={{transform:`translate(${position.x - 40}px, ${position.y - 40}px)`}}
            >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 blur-3xl opacity-80" />
            </div>
        </>
    )
}

export default CustomCursor