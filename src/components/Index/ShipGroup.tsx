import Ship from "../models/Ship.tsx";

export default function ShipGroup() {
    return (
        <group position={[0, 2, -10]}  >
            <Ship  scale={.9} rotation={[Math.PI, .4, 0]}/>
            {/*<Ship  scale={.2} rotation={[-.6, Math.PI / 2, 0]} position={[0, .6, 1]}/>*/}

            {/*<mesh rotation={[0, 0, Math.PI / 2]} position={[.85, 0, 0]}>*/}
            {/*    <cylinderGeometry args={[0.1, 0.01, .01]} />*/}
            {/*    <meshStandardMaterial*/}
            {/*        emissive="cyan"*/}
            {/*        emissiveIntensity={1}*/}
            {/*        toneMapped={false}*/}
            {/*    />*/}
            {/*</mesh>*/}

            {/*<spotLight rotation={[0, Math.PI / 2, 0]}/>*/}
        </group>

    )
}