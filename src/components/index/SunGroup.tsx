import {useFrame} from "@react-three/fiber";
import {type Mesh} from "three";
import {useRef, useState} from "react";
import Sun from "../models/Sun.tsx";
import {Html, Line, useCursor} from "@react-three/drei";
import {HoverRing} from "../HoverRing.tsx";

export default function SunGroup(){
    const [hover, setHover] = useState(false);
    const meshRef = useRef<Mesh>(null!)
    const url = "https://docs.google.com/document/d/1aRAI3thIlpdJlXqOyzp41LANNzH5nz7OcpcrcVGc3ro/edit?usp=sharing"

    useFrame((_state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.1;
        }
    });
    useCursor(hover);

    const handleClick = () => {
        window.open(url, '_blank');
    }

    return (
        <>
            <group>
                <group>
                    <Sun
                        scale={hover ? .3 : .25}
                        ref={meshRef}
                        onPointerOver={() => setHover(true)}
                        onPointerOut={() => setHover(false)}
                        onClick={() => handleClick()}
                    />

                    <HoverRing hover={hover} />
                </group>

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
            </group>
        </>
    )
}

