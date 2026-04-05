import {useThree} from "@react-three/fiber";
import DestroyedPlanetGroup from "./DestroyedPlanetGroup.tsx";
import SunGroup from "./SunGroup.tsx";
import ShipGroup from "./ShipGroup.tsx";
import {CameraControls} from "@react-three/drei";
import {type RefObject, useMemo, useRef} from "react";
import type {Mesh} from "three";
import StationGroup from "./StationGroup.tsx";

const BREAKPOINTS = {
    md: 768,
    lg: 1650
}

class SceneLayout {
    tier: string;
    width: number;
    height: number;

    constructor(width: number, viewportWidth: number, viewportHeight: number) {
        this.width = viewportWidth;
        this.height = viewportHeight;
        this.tier = this.getScreenType(width);
    }

    private getScreenType(width: number): string {
        if (width < BREAKPOINTS.md) return 'small';
        if (width < BREAKPOINTS.lg) return 'medium';
        return 'large';
    }

    get isMobile() : boolean {
        return this.tier == 'small';
    }

    get sunPos(): [number, number, number] {
        if (this.tier === 'small') return [0.5, this.height / 2 - 2.3, 0];
        if (this.tier === 'medium') return [-2, this.height / 2 - 1.7, 1];
        return [-this.width / 2 + 3, this.height / 2 - 1.5, 0];
    }

    get shipPos(): [number, number, number] {
        if (this.tier === 'small') return [-0.5, -3, 5];
        if (this.tier === 'medium') return [0, -3, 5];
        return [-.2, -this.height / 2 + 1.5, 5];
    }

    get stationPos(): [number, number, number] {
        if (this.tier === 'small') return [1.5, this.height / 2 - 4, -2];
        if (this.tier === 'medium') return [-3, this.height / 2 - 4, 0];
        return [-6, this.height / 2 - 5, -2];
    }

    get planetPos(): [number, number, number] {
        if (this.tier === 'small') return [4, -this.height / 2 - 1, -5];
        if (this.tier === 'medium') return [4, -this.height / 2 + 2.5, 0];
        return [this.width / 2 - 4, -this.height / 2 + 3, 0];
    }
}

export default function MainLayout({cameraRef, lowEnd} : {cameraRef: RefObject<CameraControls>, lowEnd: boolean}) {
    const { size, viewport } = useThree();

    const layout = useMemo(() =>
            new SceneLayout(size.width, viewport.width, viewport.height),
        [size.width, viewport.width, viewport.height]);

    const sunGroupRef = useRef<Mesh>(null!)
    const shipGroupRef = useRef<Mesh>(null!)
    const stationGroupRef = useRef<Mesh>(null!)

    return (
        <group>
            <group position={layout.sunPos} ref={sunGroupRef}>
                <SunGroup cameraRef={cameraRef} isMobile={layout.isMobile} sunGroupRef={sunGroupRef} lowEnd={lowEnd} />
            </group>

            <group position={layout.shipPos} ref={shipGroupRef}>
                <ShipGroup cameraRef={cameraRef} isMobile={layout.isMobile} shipGroupRef={shipGroupRef} lowEnd={lowEnd} />
            </group>

            <group position={layout.stationPos} ref={stationGroupRef}>
                <StationGroup cameraRef={cameraRef} isMobile={layout.isMobile} stationGroupRef={stationGroupRef} lowEnd={lowEnd} />
            </group>

            <group position={layout.planetPos}>
                <DestroyedPlanetGroup lowEnd={lowEnd} />
            </group>
        </group>
    )
}
