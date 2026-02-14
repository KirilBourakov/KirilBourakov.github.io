import {Canvas} from '@react-three/fiber'
import {Bloom, EffectComposer} from "@react-three/postprocessing";
import MainLayout from "./components/index/MainLayout.tsx";
import {ZoomContextProvider} from "./hooks/ZoomContext.tsx";
import Overlays from "./components/Overlays.tsx";


export default function App() {
    return (
        <ZoomContextProvider>
            <div className="w-screen h-screen m-0 relative">
                <Canvas dpr={[1, 1]}>
                    <EffectComposer autoClear={false} multisampling={0}>
                        <Bloom luminanceThreshold={1} intensity={2} selectable />
                    </EffectComposer>

                    <MainLayout />

                    <ambientLight intensity={2} />
                </Canvas>

                <Overlays />
            </div>
        </ZoomContextProvider>
    )
}
