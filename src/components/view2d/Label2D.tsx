import {type Dispatch, type SetStateAction} from "react";

interface Label2DProps {
    hover: boolean;
    setHover: Dispatch<SetStateAction<boolean>>;
    handleClick: () => void;
    text: string;
    align?: "left" | "right";
    className?: string;
}

export default function Label2D({ hover, setHover, handleClick, text, align = "right", className = "" }: Label2DProps) {
    const alignClass = align === "left" ? "-translate-x-full" : "";
    const borderClass = align === "left" ? "border-r-4" : "border-l-4";

    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={handleClick}
            className={`
                absolute z-20
                ${hover ? "scale-110 bg-black/60 border-orange-400 shadow-[0_0_15px_rgba(251,146,60,0.4)]" : "bg-black/30 border-orange-600"} 
                ${alignClass} ${borderClass}
                transition-all duration-300 p-2 px-4 whitespace-nowrap text-white select-none 
                backdrop-blur-sm font-mono uppercase tracking-widest text-[10px] md:text-xs cursor-pointer hover:text-orange-50
                ${className}
            `}
        >
            {text}
        </div>
    );
}
