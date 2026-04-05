import {Canvas} from '@react-three/fiber'
import {Bloom, EffectComposer} from "@react-three/postprocessing";
import MainLayout from "./components/index/MainLayout.tsx";
import {ZoomContextProvider} from "./hooks/ZoomContext.tsx";
import OverlayManager from "./components/overlays/OverlayManager.tsx";
import {Suspense, useRef} from "react";
import {CameraControls, Environment} from "@react-three/drei";
import LoadingScreen from "./components/index/LoadingScreen.tsx";

export default function App() {
    const cameraRef = useRef<CameraControls>(null!)

    return (
        <ZoomContextProvider>
            <div className="w-screen h-screen m-0 relative overflow-hidden bg-black">
                <LoadingScreen />
                
                <div className="absolute right-0 top-0 w-full h-full">
                    <Canvas dpr={[1, 1]}>
                        <Environment
                            files="/bg.jpg"
                            background
                        />

                        <EffectComposer autoClear={false} multisampling={0}>
                            <Bloom luminanceThreshold={1} intensity={2} selectable />
                        </EffectComposer>

                        <CameraControls
                            ref={cameraRef}
                            makeDefault
                            mouseButtons={{
                                left: 0,
                                middle: 0,
                                right: 0,
                                wheel: 0
                            }}
                            touches={{
                                one: 0,
                                two: 0,
                                three: 0,
                            }}
                        />

                        <Suspense fallback={null}>
                            <MainLayout cameraRef={cameraRef}/>
                        </Suspense>

                        <ambientLight intensity={2} />
                    </Canvas>
                </div>

                <OverlayManager cameraRef={cameraRef} />
            </div>
        </ZoomContextProvider>
    )
}
