import {Canvas} from '@react-three/fiber'
import {Bloom, EffectComposer} from "@react-three/postprocessing";
import MainLayout from "./components/index/MainLayout.tsx";
import {ZoomContextProvider} from "./hooks/ZoomContext.tsx";
import Overlays from "./components/Overlays.tsx";
import {useMemo, useRef} from "react";
import {CameraControls} from "@react-three/drei";


export default function App() {
    const cameraRef = useRef<CameraControls>(null!)

    const mouseButtons = useMemo(() => ({
        left: 0,
        middle: 0,
        right: 0,
        wheel: 0
    }), [])

    const touches = useMemo(() => ({
        one: 0,
        two: 0,
        three: 0,
    }), [])

    return (
        <ZoomContextProvider>
            <div className="w-screen h-screen m-0 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-full h-full">
                    <Canvas dpr={[1, 1]}>
                        <EffectComposer autoClear={false} multisampling={0}>
                            <Bloom luminanceThreshold={1} intensity={2} selectable />
                        </EffectComposer>

                        <CameraControls
                            ref={cameraRef}
                            makeDefault
                            mouseButtons={mouseButtons}
                            touches={touches}
                        />

                        <MainLayout cameraRef={cameraRef}/>

                        <ambientLight intensity={2} />
                    </Canvas>
                </div>

                <Overlays cameraRef={cameraRef} />
            </div>
        </ZoomContextProvider>
    )
}
