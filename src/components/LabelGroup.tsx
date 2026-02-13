import {Html, Line} from "@react-three/drei";
import type {Dispatch, SetStateAction} from "react";
import {Vector3} from "three";

interface labelProps {
    hover: boolean
    setHover: Dispatch<SetStateAction<boolean>>
    handleClick: () => void
    linePoints: Vector3[]
    htmlPos: Vector3
    text: string
}

export function LabelGroup({hover, setHover, handleClick, linePoints, htmlPos, text}: labelProps) {
    return (
        <>
            <Line
                points={linePoints}
                color="black"
                opacity={.3}
            />
            <Html position={htmlPos}>
                <div
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    onClick={() => handleClick()}
                    className={`${hover ? "scale-125" : ""} p-2 rounded-lg whitespace-nowrap bg-black/30 text-white select-none`}
                >
                    {text}
                </div>
            </Html>
        </>
    )
}