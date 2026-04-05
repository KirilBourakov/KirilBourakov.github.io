import {DestroyedPlanet} from "../models/DestroyedPlanet.tsx";
import {DoubleSide} from "three";

export default function DestroyedPlanetGroup({lowEnd} : {lowEnd?: boolean}){
    const ringData = [
        { inner: 1.35, outer: 1.6, opacity: 0.4 },
        { inner: 1.65, outer: 1.7, opacity: 0.9 },
        { inner: 1.8, outer: 2.2, opacity: 0.2 },
    ]

    return (
        <group scale={2.5} rotation={[-Math.PI / 2, -0.523599, 0]}>
            <DestroyedPlanet lowEnd={lowEnd} />

            <group>
                {ringData.map((ring, index) => (
                    <mesh key={index}>
                        <ringGeometry
                            args={[ring.inner, ring.outer, lowEnd ? 32 : 128]}
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
        </group>
    )
}