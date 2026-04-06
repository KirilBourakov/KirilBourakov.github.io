import {animated, type SpringValue, useTransition} from "@react-spring/three";
import {useRef} from "react";
import {DoubleSide, Group, type Vector3} from "three";
import {useFrame} from "@react-three/fiber";

interface RingProps {
    hover: boolean;
    innerRadius: number;
    outerRadius: number;
    position: Vector3;
}

interface StyleProps {
    scale: SpringValue<number>;
    opacity: SpringValue<number>;
}

export function HoverRing(props : RingProps) {
    const transitions = useTransition(props.hover, {
        from: {scale: 0, opacity: 0},
        enter: {scale: 1, opacity: 0.4},
        leave: {scale: 0, opacity: 0},
        config: {mass: 1, tension: 170, friction: 26},
    })

    return transitions((styles, item) =>
        item ? <SpinningRing styles={styles} other={props} /> : null
    )
}

function SpinningRing({styles, other}: { styles: StyleProps, other: RingProps}) {
    const ringRef = useRef<Group>(null!)

    useFrame((_state, delta) => {
        ringRef.current.rotation.z += delta
    })

    const chunks = [0, 1, 2, 3]
    const segmentLength = 1.309
    const offset = Math.PI / 2 - segmentLength

    return (
        <animated.group ref={ringRef} scale={styles.scale} position={other.position}>
            {chunks.map((i) => (
                <mesh key={i}>
                    <ringGeometry
                        args={[
                            other.innerRadius,
                            other.outerRadius,
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