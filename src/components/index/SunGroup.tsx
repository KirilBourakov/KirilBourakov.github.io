import {useFrame} from "@react-three/fiber";
import {type Mesh, Vector3} from "three";
import {type RefObject, useRef, useState} from "react";
import Sun from "../models/Sun.tsx";
import {type CameraControls, useCursor} from "@react-three/drei";
import {HoverRing} from "../HoverRing.tsx";
import {LabelGroup} from "../LabelGroup.tsx";
import {useZoom, ZoomType} from "../../hooks/ZoomContext.tsx";

export default function SunGroup({ cameraRef, isMobile, sunGroupRef } : { cameraRef: RefObject<CameraControls>, isMobile : boolean, sunGroupRef: RefObject<Mesh> }) {
    const { zoomFocus, setZoomFocus } = useZoom();
    const isZoomed = zoomFocus === ZoomType.RESUME

    const [hover, setHover] = useState(false);
    const meshRef = useRef<Mesh>(null!)
    const linePoints = isMobile ? [
        new Vector3(0, 0, 0),
        new Vector3(-.8, 0, 0),
        new Vector3(-.8, 0, 0)
    ] : [
        new Vector3(0, 0, 0),
        new Vector3(0, -1.2, 0),
        new Vector3(0.5, -1.2, 0)
    ];

    useFrame((_state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.1;
        }
    });
    useCursor(hover && !isZoomed);

    const handleClick = () => {

        if (sunGroupRef.current && zoomFocus === ZoomType.NONE) {
            setZoomFocus(ZoomType.RESUME)
            console.log(sunGroupRef.current)

            const pos = sunGroupRef.current.position
            cameraRef.current.setLookAt(
                pos.x, pos.y, pos.z + 1, // New Camera Position
                pos.x + 1, pos.y, pos.z,     // New Target Position
                true                              // Smooth Transition
            )
        }
    }

    return (
        <>
            <group>
                <group>
                    <Sun
                        scale={hover && !isZoomed ? .3 : .25}
                        ref={meshRef}
                        onPointerOver={() => setHover(true)}
                        onPointerOut={() => setHover(false)}
                        onClick={() => handleClick()}
                    />

                    {!isZoomed &&
                        <HoverRing
                            hover={hover}
                            innerRadius={0.7}
                            outerRadius={0.8}
                            position={new Vector3(0,0,0)}
                        />
                    }
                </group>

                {!isZoomed &&
                    <LabelGroup
                        hover={hover}
                        setHover={setHover}
                        handleClick={handleClick}
                        linePoints={linePoints}
                        text={"[ RESUME ]"}
                        align={isMobile ? "left" : "right"}
                    />
                }
            </group>
        </>
    )
}

