import {type Dispatch, type RefObject, type SetStateAction, useEffect, useRef, useState} from "react";
import { createPortal } from "react-dom";

interface Label2DProps {
    hover: boolean;
    setHover: Dispatch<SetStateAction<boolean>>;
    handleClick: () => void;
    text: string;
    imgRef: RefObject<HTMLDivElement | null>
    align?: "left" | "right";
    className?: string;
}

export default function Label2D({ hover, setHover, handleClick, text, imgRef, align = "right", className = "" }: Label2DProps) {
    const alignClass = align === "left" ? "-translate-x-full" : "";
    const borderClass = align === "left" ? "border-r-4" : "border-l-4";
    const labelRef = useRef<HTMLDivElement | null>(null);


    return (
        <>
            <div
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={handleClick}
                ref={labelRef}
                className={`
                    absolute z-20
                    ${hover ? "scale-110 bg-black/60 border-orange-400" : "bg-black/30 border-orange-600"} 
                    ${alignClass} ${borderClass}
                    transition-all duration-300 p-2 px-4 whitespace-nowrap text-white select-none 
                    backdrop-blur-sm font-mono uppercase tracking-widest text-[10px] md:text-xs cursor-pointer hover:text-orange-50
                    ${className}
                `}
            >
                {text}
            </div>
            <SvgLine labelRef={labelRef} imageRef={imgRef} align={align} hover={hover} />
        </>
    );
}

interface Coords{
    imgX: number;
    imgY: number;
    labelX: number;
    labelY: number;
}

function SvgLine({ imageRef, labelRef, align, hover} : { imageRef: RefObject<HTMLDivElement | null>, labelRef: RefObject<HTMLDivElement | null>, align: "left" | "right", hover: boolean }) {
    const [lineCoords, setLineCoords] = useState<Coords | null>(null);

    useEffect(() => {
        function calculatePositions() {
            if (!imageRef.current || !labelRef.current) return;

            const img = imageRef.current.getBoundingClientRect();
            const label = labelRef.current.getBoundingClientRect();

            let imgX = 0;
            let labelX = 0;

            if (align === "left") {
                imgX = img.left + (img.width / 2)
                labelX = label.right;
            } else {
                imgX = img.right - (img.width / 2)
                labelX = label.left;
            }

            const imgY = img.top + (img.height / 2);
            const labelY = label.top + (label.height / 2);

            setLineCoords({ imgX, imgY, labelX, labelY });
        }

        calculatePositions();
        window.addEventListener('resize', calculatePositions);
        return () => window.removeEventListener('resize', calculatePositions);
    }, [imageRef, labelRef, align, hover]);

    if (!lineCoords) return null;

    return createPortal(
        <svg className="fixed inset-0 w-full h-full pointer-events-none z-50">
            <line
                x1={lineCoords.imgX} y1={lineCoords.imgY}
                x2={lineCoords.labelX} y2={lineCoords.labelY}
                stroke="black" strokeWidth="2"
            />
        </svg>,
        document.body
    );
}
