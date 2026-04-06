import {ZoomContextProvider} from "./hooks/ZoomContext.tsx";
import {useEffect, useState} from "react";
import {getGPUTier, type TierResult} from 'detect-gpu';
import {LoadingScreen} from "./components/ModelLoadingScreen.tsx";
import Main2D from "./components/view2d/Main2D.tsx";
import {Main3D} from "./components/view3d/Main3D.tsx";


export default function App() {
    const [gpuData, setGpuData] = useState<TierResult | null>(null);

    useEffect(() => {
        (async () => {
            const gpuTier = await getGPUTier();
            setGpuData(gpuTier);
        })();
    }, []);


    if (!gpuData) return <LoadingScreen active={true} progress={0} />

    return (
        <ZoomContextProvider>
            <Main2D />
            {/*{gpuData.tier < 2 || gpuData.isMobile ?*/}
            {/*    <Main2D />*/}
            {/*:*/}
            {/*    <Main3D />*/}
            {/*}*/}
        </ZoomContextProvider>
    )
}
