import {Canvas} from '@react-three/fiber'
import {Bloom, EffectComposer} from "@react-three/postprocessing";
import MainLayout from "./components/index/MainLayout.tsx";


export default function App() {
    return (
        <div className="w-screen h-screen m-0 relative">
            <Canvas dpr={[1, 1]}>
                <EffectComposer autoClear={false} multisampling={0}>
                    <Bloom luminanceThreshold={1} intensity={2} selectable />
                </EffectComposer>

                <MainLayout />

                <ambientLight intensity={2} />
            </Canvas>

            <div className="absolute right-0 top-0 w-screen h-screen lg:w-2/3 bg-white/50">
                Projects Here
            </div>
        </div>
    )
}
