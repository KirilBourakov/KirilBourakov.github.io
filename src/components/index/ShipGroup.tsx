import Ship from "../models/Ship.tsx";
import {HoverRing} from "../HoverRing.tsx";
import {type RefObject, useRef, useState} from "react";
import {type CameraControls, useCursor} from "@react-three/drei";
import {Mesh, Vector3} from "three";
import {LabelGroup} from "../LabelGroup.tsx";
import {useZoom, ZoomType} from "../../hooks/ZoomContext.tsx";

export default function ShipGroup({ cameraRef }: {cameraRef: RefObject<CameraControls>}) {
    const [hover, setHover] = useState(false);

    // zoom state
    const { zoomFocus, setZoomFocus } = useZoom();
    const isZoomed = zoomFocus === ZoomType.PROJECTS

    // meshes
    const meshRef = useRef<Mesh>(null!)
    useCursor(hover && !isZoomed)

    function zoom() {
        if (meshRef.current) {
            if (zoomFocus == ZoomType.NONE) {
                setZoomFocus(ZoomType.PROJECTS)
                cameraRef.current.fitToBox(
                    meshRef.current,
                    true,
                    {
                        paddingLeft: 0,
                        paddingRight: 0,
                        paddingTop: 0,
                        paddingBottom: 0
                    }
                );
            } else {
                cameraRef.current.reset(true).then(
                    () => setZoomFocus(ZoomType.NONE)
                )
            }
        }
    }

    return (
        <group position={[0, 2, -10]}  >
            <group>
                <Ship
                    scale={hover && !isZoomed ? .95 : .9}
                    rotation={[Math.PI, .4, 0]}
                    onPointerOver={() => setHover(true)}
                    onPointerOut={() => setHover(false)}
                    onClick={zoom}
                    ref={meshRef}
                />

                {!isZoomed &&
                    <HoverRing
                        hover={hover}
                        innerRadius={2.8}
                        outerRadius={3.1}
                        position={new Vector3(1,-.5,0)}
                    />
                }
            </group>

            {!isZoomed &&
                <LabelGroup
                    hover={hover}
                    setHover={setHover}
                    handleClick={zoom}
                    linePoints={[
                        new Vector3(0, -.5, 0),
                        new Vector3(0, -4.6, 0),
                        new Vector3(-0.5, -4.6, 0)
                    ]}
                    htmlPos={new Vector3(-0.5, -4.2, 0)}
                    align="left"
                    text={"[ PROJECTS ]"}
                />
            }
        </group>

    )
}
