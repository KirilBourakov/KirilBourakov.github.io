import {animated, useTransition} from "@react-spring/three";
import {useRef} from "react";
import {DoubleSide, Group} from "three";
import {useFrame} from "@react-three/fiber";

export function HoverRing({hover}: { hover: boolean }) {
    const transitions = useTransition(hover, {
        from: {scale: 0, opacity: 0},
        enter: {scale: 1, opacity: 0.4},
        leave: {scale: 0, opacity: 0},
        config: {mass: 1, tension: 170, friction: 26},
    })

    return transitions((styles, item) =>
        item ? <SpinningRing styles={styles}/> : null
    )
}

function SpinningRing({styles}: { styles: any }) {
    const ringRef = useRef<Group>(null!)

    useFrame((state, delta) => {
        ringRef.current.rotation.z += delta
    })

    const chunks = [0, 1, 2, 3]
    const segmentLength = 1.309
    const offset = Math.PI / 2 - segmentLength

    return (
        <animated.group ref={ringRef} scale={styles.scale}>
            {chunks.map((i) => (
                <mesh key={i}>
                    <ringGeometry
                        args={[
                            0.7,           // innerRadius
                            0.8,           // outerRadius
                            32,            // thetaSegments
                            1,             // phiSegments
                            (i * segmentLength) + (i * offset), // thetaStart
                            segmentLength      // thetaLength
                        ]}
                    />
                    <animated.meshStandardMaterial
                        color="orange"
                        transparent
                        opacity={styles.opacity}
                        side={DoubleSide}
                    />
                </mesh>
            ))}
        </animated.group>
    )
}