import {Html, Line} from "@react-three/drei";
import type {Dispatch, SetStateAction} from "react";

interface labelProps {
    hover: boolean
    setHover: Dispatch<SetStateAction<boolean>>
    handleClick: () => void
}

export function LabelGroup({hover, setHover, handleClick}: labelProps) {
    return (
        <>
            <Line
                points={[[0, 0, 0], [0, -1.2, 0], [0.5, -1.2, 0]]}
                color="black"
                opacity={.3}
            />
            <Html position={[0.5, -1, 0]}>
                <div
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    onClick={() => handleClick()}
                    className={`${hover ? "scale-125" : ""} p-2 rounded-lg whitespace-nowrap bg-black/30 text-white select-none`}
                >
                    [ RESUME ]
                </div>
            </Html>
        </>
    )
}