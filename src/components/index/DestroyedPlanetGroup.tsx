import {DestroyedPlanet} from "../models/DestroyedPlanet.tsx";
import {DoubleSide} from "three";
import {Box} from "@react-three/flex";

export default function DestroyedPlanetGroup(){
    const ringData = [
        { inner: 1.35, outer: 1.6, opacity: 0.4 },
        { inner: 1.65, outer: 1.7, opacity: 0.9 },
        { inner: 1.8, outer: 2.2, opacity: 0.2 },
    ]

    return (
        <Box centerAnchor scale={2} rotation={[-Math.PI / 2, -0.523599, 0]}>
            <DestroyedPlanet  />

            <group>
                {ringData.map((ring, index) => (
                    <mesh key={index}>
                        <ringGeometry
                            args={[ring.inner, ring.outer, 128]}
                        />
                        <meshStandardMaterial
                            color="orange"
                            transparent
                            opacity={ring.opacity}
                            side={DoubleSide}
                        />
                    </mesh>
                ))}
            </group>
        </Box>
    )
}