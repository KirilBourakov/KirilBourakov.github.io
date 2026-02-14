import Ship from "../models/Ship.tsx";
import {HoverRing} from "../HoverRing.tsx";
import {useEffect, useRef, useState} from "react";
import {useBounds, useCursor} from "@react-three/drei";
import {Mesh, Vector3} from "three";
import {LabelGroup} from "../LabelGroup.tsx";
import {useThree} from "@react-three/fiber";

export default function ShipGroup() {
    const [hover, setHover] = useState(false);
    const [zoomed, setZoomed] = useState(false);
    const meshRef = useRef<Mesh>(null!)
    const api = useBounds()
    const { camera, size } = useThree()
    useCursor(hover)

    useEffect(() => {
        if (zoomed && meshRef.current) {
            const viewWidth = size.width
            const viewHeight = size.height
            const xOffset = viewWidth * 0.333

            camera.setViewOffset(
                viewWidth,
                viewHeight,
                xOffset,
                0,
                viewWidth,
                viewHeight
            )
            api.refresh(meshRef.current).fit()
        }
    }, [size, zoomed, camera, api]);

    function zoom() {
        if (meshRef.current) {
            setZoomed(true)
        }
    }

    return (
        <group position={[0, 2, -10]}  >
            <group ref={meshRef}>
                <Ship
                    scale={hover && !zoomed ? .95 : .9}
                    rotation={[Math.PI, .4, 0]}
                    onPointerOver={() => setHover(true)}
                    onPointerOut={() => setHover(false)}
                    onClick={zoom}
                />

                {!zoomed &&
                    <HoverRing
                        hover={hover}
                        innerRadius={2.8}
                        outerRadius={3.1}
                        position={new Vector3(1,-.5,0)}
                    />
                }
            </group>

            {!zoomed &&
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