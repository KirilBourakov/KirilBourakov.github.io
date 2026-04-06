import {Canvas} from '@react-three/fiber'
import {Bloom, EffectComposer} from "@react-three/postprocessing";
import MainLayout from "./components/index/MainLayout.tsx";
import {ZoomContextProvider} from "./hooks/ZoomContext.tsx";
import OverlayManager from "./components/overlays/OverlayManager.tsx";
import {Suspense, useEffect, useRef, useState} from "react";
import {BakeShadows, CameraControls, Environment, PerformanceMonitor} from "@react-three/drei";
import ModelLoadingScreen, {LoadingScreen} from "./components/index/ModelLoadingScreen.tsx";
import {getGPUTier, type TierResult} from 'detect-gpu';


export default function App() {
    const cameraRef = useRef<CameraControls>(null!)
    const [dpr, setDpr] = useState(1)
    const [lowEndMode, setLowEndMode] = useState(false)
    const [gpuData, setGpuData] = useState<TierResult | null>(null);

    useEffect(() => {
        (async () => {
            const gpuTier = await getGPUTier();
            setGpuData(gpuTier);
        })();
    }, []);


    if (!gpuData) return <LoadingScreen active={true} progress={0} />

    if (gpuData.tier < 2 || gpuData.isMobile) {
        return <div>This device is not supported</div>
    }

    return (
        <ZoomContextProvider>
            <div className="w-screen h-screen m-0 relative overflow-hidden bg-black">
                <ModelLoadingScreen />
                
                <div className="absolute right-0 top-0 w-full h-full">
                    <Canvas dpr={[dpr, dpr]}>
                        <PerformanceMonitor
                            onDecline={() => {
                                if (document.visibilityState === 'visible') {
                                    setDpr(.5)
                                    setLowEndMode(true)
                                }
                            }}
                            onIncline={() => {
                                setDpr(1)
                                setLowEndMode(false)
                            }}
                        />

                        <Environment
                            files="/bg.jpg"
                            background
                        />

                        <BakeShadows />

                        {!lowEndMode &&
                            <EffectComposer autoClear={false} multisampling={0}>
                                <Bloom luminanceThreshold={1} intensity={2} selectable />
                            </EffectComposer>
                        }

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
                            <MainLayout cameraRef={cameraRef} lowEnd={lowEndMode}/>
                        </Suspense>

                        <ambientLight intensity={2} />
                    </Canvas>
                </div>

                <OverlayManager cameraRef={cameraRef} />
            </div>
        </ZoomContextProvider>
    )
}
