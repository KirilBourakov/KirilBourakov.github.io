import {useThree} from "@react-three/fiber";
import DestroyedPlanetGroup from "./DestroyedPlanetGroup.tsx";
import SunGroup from "./SunGroup.tsx";
import ShipGroup from "./ShipGroup.tsx";
import {CameraControls} from "@react-three/drei";
import {type RefObject} from "react";

export default function MainLayout({cameraRef} : {cameraRef: RefObject<CameraControls>}) {
    const { viewport } = useThree()

    const left = -viewport.width / 2 + 3
    const right = viewport.width / 2 - 4
    const top = viewport.height / 2 - 1.5
    const bottom = -viewport.height / 2 + 1.5
    const planetBottom = -viewport.height / 2 + 3

    return (
        <group>
            <group position={[left, top, 0]}>
                <SunGroup />
            </group>

            <group position={[left, bottom, 5]}>
                <ShipGroup cameraRef={cameraRef}/>
            </group>

            <group position={[right, planetBottom, 0]}>
                <DestroyedPlanetGroup />
            </group>
        </group>
    )
}
