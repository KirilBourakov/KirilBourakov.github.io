import {type Mesh, Vector3} from "three";
import {type RefObject, useRef, useState} from "react";
import {Station} from "../models/Station.tsx";
import {type CameraControls, useCursor} from "@react-three/drei";
import {HoverRing} from "../HoverRing.tsx";
import {LabelGroup} from "../LabelGroup.tsx";
import {useZoom, ZoomType} from "../../hooks/ZoomContext.tsx";

export default function StationGroup({ cameraRef, isMobile, stationGroupRef } : { cameraRef: RefObject<CameraControls>, isMobile : boolean, stationGroupRef: RefObject<Mesh> }) {
    const { zoomFocus, setZoomFocus } = useZoom();
    const isNotZoomed = zoomFocus === ZoomType.NONE

    const [hover, setHover] = useState(false);
    const meshRef = useRef<Mesh>(null!)
    const linePoints = isMobile ? [
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 0),
        new Vector3(-1.2, 0, 0)
    ] : [
        new Vector3(0, 0, 0),
        new Vector3(0, -1.7, 0),
        new Vector3(.7, -1.7, 0)
    ];

    useCursor(hover && isNotZoomed);

    const handleClick = () => {
        if (stationGroupRef.current && zoomFocus === ZoomType.NONE) {
            setZoomFocus(ZoomType.EXPERIENCE);

            const prev = cameraRef.current.smoothTime
            cameraRef.current.smoothTime = .9

            const pos = stationGroupRef.current.position
            if (isMobile){
                cameraRef.current.setLookAt(
                    pos.x, pos.y, pos.z - 5,
                    pos.x + 1, pos.y, pos.z,
                    true
                ).then(() => cameraRef.current.smoothTime = prev)
            } else {
                cameraRef.current.setLookAt(
                    pos.x, pos.y, pos.z - 5,
                    pos.x + 5, pos.y, pos.z,
                    true
                ).then(() => cameraRef.current.smoothTime = prev)
            }


        }
    }

    return (
        <group>
            <group ref={meshRef}>
                <Station
                    scale={hover && isNotZoomed ? 1.2 : 1}
                    onPointerOver={() => setHover(true)}
                    onPointerOut={() => setHover(false)}
                    onClick={() => handleClick()}
                />

                {isNotZoomed &&
                    <HoverRing
                        hover={hover}
                        innerRadius={1.6}
                        outerRadius={1.8}
                        position={new Vector3(-.1,0,0)}
                    />
                }
            </group>

            {isNotZoomed &&
                <LabelGroup
                    hover={hover}
                    setHover={setHover}
                    handleClick={handleClick}
                    linePoints={linePoints}
                    text={"[ EXPERIENCE ]"}
                    align={isMobile ? "left" : "right"}
                />
            }
        </group>
    )
}
