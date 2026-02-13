import {useFrame} from "@react-three/fiber";
import {type Mesh, Vector3} from "three";
import {useRef, useState} from "react";
import Sun from "../models/Sun.tsx";
import {useCursor} from "@react-three/drei";
import {HoverRing} from "../HoverRing.tsx";
import {LabelGroup} from "../LabelGroup.tsx";

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

                    <HoverRing
                        hover={hover}
                        innerRadius={0.7}
                        outerRadius={0.8}
                        position={new Vector3(0,0,0)}
                    />
                </group>

                <LabelGroup
                    hover={hover}
                    setHover={setHover}
                    handleClick={handleClick}
                    linePoints={[
                        new Vector3(0, 0, 0),
                        new Vector3(0, -1.2, 0),
                        new Vector3(0.5, -1.2, 0)
                    ]}
                    htmlPos={new Vector3(0.5, -1, 0)}
                    text={"[ RESUME ]"}
                />
            </group>
        </>
    )
}

