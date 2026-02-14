import Ship from "../models/Ship.tsx";
import {HoverRing} from "../HoverRing.tsx";
import {useEffect, useRef, useState} from "react";
import {useBounds, useCursor} from "@react-three/drei";
import {Mesh, Vector3, MathUtils} from "three";
import {LabelGroup} from "../LabelGroup.tsx";
import {useFrame, useThree} from "@react-three/fiber";
import {useZoom, ZoomType} from "../../hooks/ZoomContext.tsx";

export default function ShipGroup() {
    const [hover, setHover] = useState(false);

    // zoom state
    const { zoomFocus, setZoomFocus } = useZoom();
    const prevZoomFocus = useRef(zoomFocus)
    const isZoomed = zoomFocus === ZoomType.PROJECTS

    // camera position & offset state
    const { camera, size } = useThree()
    const initialCameraPosition = useRef<Vector3>(new Vector3())
    useEffect(() => {initialCameraPosition.current.copy(camera.position)}, [])

    const currentXOffset = useRef(0)
    const boundsApi = useBounds()

    // meshes
    const meshRef = useRef<Mesh>(null!)
    useCursor(hover && !isZoomed)

    // ZOOM LOGIC
    useFrame((_state, delta) => {
        const targetXOffset = isZoomed ? size.width * 0.333 : 0
        currentXOffset.current = MathUtils.lerp(currentXOffset.current, targetXOffset, delta * 4)

        if (Math.abs(currentXOffset.current - targetXOffset) > 0.01 || isZoomed) {
            camera.setViewOffset(
                size.width,
                size.height,
                currentXOffset.current,
                0,
                size.width,
                size.height
            )
        } else if (!isZoomed && currentXOffset.current !== 0) {
            camera.clearViewOffset()
            currentXOffset.current = 0
        }
    })

    useEffect(() => {
        if (isZoomed && meshRef.current) {
            boundsApi.refresh(meshRef.current).fit()
        } else if (!isZoomed && prevZoomFocus.current === ZoomType.PROJECTS) {
            boundsApi.to({
                position: [initialCameraPosition.current.x, initialCameraPosition.current.y, initialCameraPosition.current.z],
                target: [0, 0, 0]
            })
        }
        prevZoomFocus.current = zoomFocus
    }, [zoomFocus, boundsApi, isZoomed]);

    function zoom() {
        if (meshRef.current) {
            setZoomFocus(ZoomType.PROJECTS);
        }
    }

    return (
        <group position={[0, 2, -10]}  >
            <group ref={meshRef}>
                <Ship
                    scale={hover && !isZoomed ? .95 : .9}
                    rotation={[Math.PI, .4, 0]}
                    onPointerOver={() => setHover(true)}
                    onPointerOut={() => setHover(false)}
                    onClick={zoom}
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
