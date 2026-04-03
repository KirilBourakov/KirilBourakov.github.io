import {useThree} from "@react-three/fiber";
import DestroyedPlanetGroup from "./DestroyedPlanetGroup.tsx";
import SunGroup from "./SunGroup.tsx";
import ShipGroup from "./ShipGroup.tsx";
import {CameraControls} from "@react-three/drei";
import {type RefObject, useRef} from "react";
import type {Mesh} from "three";
import StationGroup from "./StationGroup.tsx";

const BREAKPOINT = 1650;

export default function MainLayout({cameraRef} : {cameraRef: RefObject<CameraControls>}) {
    const { size, viewport } = useThree();
    const isMobile = size.width < BREAKPOINT;

    const sunGroupX = isMobile ? .5 : -viewport.width / 2 + 3;
    const sunGroupY = isMobile ? viewport.height / 2 - 2.3 : viewport.height / 2 - 1.5;
    const sunGroupRef = useRef<Mesh>(null!)

    const shipX = isMobile ? -.5 : -viewport.width / 2 + 7;
    const shipY = isMobile ? -3 : -viewport.height / 2 + 1.5;
    const shipGroupRef = useRef<Mesh>(null!)

    const stationX = isMobile ? 1.5 : viewport.width / 2 - 14;
    const stationY = isMobile ? viewport.height / 2 - 4 : viewport.height / 2 - 6;
    const stationGroupRef = useRef<Mesh>(null!)

    const destroyedPlanetY = isMobile ? -viewport.height / 2 - 1 : -viewport.height / 2 + 3;
    const destroyedPlanetX = isMobile ? 4 : (viewport.width / 2 - 4);
    const destroyedPlanetZ = isMobile ? -5 : 0;

    return (
        <group>
            <group position={[sunGroupX, sunGroupY, 0]} ref={sunGroupRef}>
                <SunGroup cameraRef={cameraRef} isMobile={isMobile} sunGroupRef={sunGroupRef} />
            </group>

            <group position={[shipX, shipY, 5]} ref={shipGroupRef}>
                <ShipGroup cameraRef={cameraRef} isMobile={isMobile} shipGroupRef={shipGroupRef} />
            </group>

            <group position={[stationX, stationY, -2]} ref={stationGroupRef}>
                <StationGroup cameraRef={cameraRef} isMobile={isMobile} stationGroupRef={stationGroupRef} />
            </group>

            <group position={[destroyedPlanetX, destroyedPlanetY, destroyedPlanetZ]}>
                <DestroyedPlanetGroup />
            </group>
        </group>
    )
}
