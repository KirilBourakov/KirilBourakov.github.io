import Ship from "../models/Ship.tsx";
import {HoverRing} from "../HoverRing.tsx";
import {type RefObject, useRef, useState} from "react";
import {type CameraControls, useCursor} from "@react-three/drei";
import {Mesh, Vector3} from "three";
import {LabelGroup} from "../LabelGroup.tsx";
import {useZoom, ZoomType} from "../../hooks/ZoomContext.tsx";

export default function ShipGroup({ cameraRef, isMobile, shipGroupRef }: {cameraRef: RefObject<CameraControls>, isMobile : boolean, shipGroupRef: RefObject<Mesh> }) {
    const [hover, setHover] = useState(false);

    const linePoints = isMobile ? [
        new Vector3(0, -.25, 0),
        new Vector3(0, -1.1, 0),
        new Vector3(-0.25, -1.1, 0)
    ] : [
        new Vector3(0, -.25, 0),
        new Vector3(0, -2.2, 0),
        new Vector3(-0.25, -2.2, 0)
    ];

    // zoom state
    const { zoomFocus, setZoomFocus } = useZoom();
    const isZoomed = zoomFocus === ZoomType.PROJECTS

    // meshes
    const meshRef = useRef<Mesh>(null!)
    useCursor(hover && !isZoomed)

    function zoom() {
        if (meshRef.current && zoomFocus === ZoomType.NONE) {
            setZoomFocus(ZoomType.PROJECTS)
            const pos = shipGroupRef.current.position
            cameraRef.current.setLookAt(
                pos.x - 1.5, pos.y - 1, pos.z + 1,
                pos.x + 1, pos.y, pos.z,
                true
            )
        }
    }

    return (
        <group position={[0, 2, -5]}  >
            <group>
                <Ship
                    scale={hover && !isZoomed ? .45 : .40}
                    rotation={[Math.PI, .4, 0]}
                    onPointerOver={() => setHover(true)}
                    onPointerOut={() => setHover(false)}
                    onClick={zoom}
                    ref={meshRef}
                />

                {!isZoomed &&
                    <HoverRing
                        hover={hover}
                        innerRadius={1.4}
                        outerRadius={1.55}
                        position={new Vector3(.25,-.35,0)}
                    />
                }
            </group>

            {!isZoomed &&
                <LabelGroup
                    hover={hover}
                    setHover={setHover}
                    handleClick={zoom}
                    linePoints={linePoints}
                    align="left"
                    text={"[ PROJECTS ]"}
                />
            }
        </group>

    )
}
