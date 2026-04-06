import {Html, Line} from "@react-three/drei";
import type {Dispatch, SetStateAction} from "react";
import {Vector3} from "three";

interface labelProps {
    hover: boolean
    setHover: Dispatch<SetStateAction<boolean>>
    handleClick: () => void
    linePoints: Vector3[]
    text: string
    align?: "left" | "right"
}

export function LabelGroup({hover, setHover, handleClick, linePoints, text, align = "right"}: labelProps) {
    const alignClass = align === "left" ? "-translate-x-full origin-right" : "origin-left";
    const borderClass = align === "left" ? "border-r-4" : "border-l-4";
    const connectionPoint = linePoints[linePoints.length - 1];

    return (
        <>
            <Line
                points={linePoints}
                color="orange"
                opacity={0.6}
                lineWidth={1}
            />
            <Html position={connectionPoint}>
                <div
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    onClick={() => handleClick()}
                    className={`
                        ${hover ? "scale-110 bg-black/60 border-orange-400 shadow-[0_0_15px_rgba(251,146,60,0.4)]" : "bg-black/30 border-orange-600"} 
                        ${alignClass} ${borderClass} -translate-y-1/2
                        transition-all duration-300 p-2 px-4 whitespace-nowrap text-white select-none 
                        backdrop-blur-sm font-mono uppercase tracking-widest text-xs cursor-pointer hover:text-orange-50
                    `}
                >
                    {text}
                </div>
            </Html>
        </>
    )
}