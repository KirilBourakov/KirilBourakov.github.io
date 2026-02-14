import Ship from "../models/Ship.tsx";
import {HoverRing} from "../HoverRing.tsx";
import {useEffect, useRef, useState} from "react";
import {useBounds, useCursor} from "@react-three/drei";
import {Mesh, Vector3, MathUtils} from "three";
import {LabelGroup} from "../LabelGroup.tsx";
import {useFrame, useThree} from "@react-three/fiber";

export default function ShipGroup() {
    const [hover, setHover] = useState(false);
    const [zoomed, setZoomed] = useState(false);
    const meshRef = useRef<Mesh>(null!)
    const currentXOffset = useRef(0)
    const api = useBounds()
    const { camera, size } = useThree()
    useCursor(hover && !zoomed)

    useFrame((_state, delta) => {
        const targetXOffset = zoomed ? size.width * 0.333 : 0
        currentXOffset.current = MathUtils.lerp(currentXOffset.current, targetXOffset, delta * 4)

        if (Math.abs(currentXOffset.current - targetXOffset) > 0.1 || zoomed) {
            camera.setViewOffset(
                size.width,
                size.height,
                currentXOffset.current,
                0,
                size.width,
                size.height
            )
            camera.updateProjectionMatrix()
        } else if (!zoomed && currentXOffset.current !== 0) {
            camera.clearViewOffset()
            currentXOffset.current = 0
        }
    })

    useEffect(() => {
        if (zoomed && meshRef.current) {
            api.refresh(meshRef.current).fit()
        }
    }, [size, zoomed, api]);

    function zoom() {
        if (meshRef.current) {
            setZoomed(!zoomed);
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