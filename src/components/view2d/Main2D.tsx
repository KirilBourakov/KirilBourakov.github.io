import OverlayManager from "../overlays/OverlayManager.tsx";
import Star2D from "./Star2D.tsx";
import Ship2D from "./Ship2D.tsx";
import Station2D from "./Station2D.tsx";
import {TransformComponent, TransformWrapper, useControls} from "react-zoom-pan-pinch";
import {useZoom, ZoomType} from "../../hooks/ZoomContext.tsx";
import {useEffect} from "react";

function ZoomHandler() {
    const { zoomFocus } = useZoom();
    const { resetTransform } = useControls();

    useEffect(() => {
        if (zoomFocus === ZoomType.NONE) {
            resetTransform(600, "easeOut");
        }
    }, [zoomFocus, resetTransform]);

    return null;
}

export default function Main2D(){
    return (
        <>
            <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
                <div
                    className="absolute inset-0 bg-[url('/bg2d.png')] bg-cover bg-[55%_center] md:bg-center"
                ></div>

                <TransformWrapper 
                    initialScale={1}
                    minScale={1}
                    maxScale={5}
                    centerOnInit={true}
                    disabled={true}
                    limitToBounds={false}
                >
                    <ZoomHandler />
                    <TransformComponent
                        wrapperStyle={{ width: "100%", height: "100%" }}
                        contentStyle={{ width: "100vw", height: "100vh" }}
                    >
                        <Star2D />
                        <Ship2D />
                        <Station2D />
                    </TransformComponent>
                </TransformWrapper>
            </div>

            <div
                className="fixed bottom-4 right-0 z-50 bg-black/80 backdrop-blur-xl text-white/90 pl-10 pr-6 py-3 font-mono text-sm md:text-xs uppercase
                tracking-widest pointer-events-none border-l border-orange-500/30 [clip-path:polygon(32px_0%,_100%_0%,_100%_100%,_0%_100%)]"
            >
                <div className="absolute left-0 top-0 w-1 h-full bg-orange-500"></div>
                <div className="flex flex-col gap-1 items-end relative">
                    <span className="text-orange-500 font-bold flex items-center gap-2">
                        <span className="w-2 h-2 bg-orange-500 animate-pulse rounded-full"></span>
                        System Status: 2D Fallback Active
                    </span>
                    <span className="opacity-70">Hardware incompatible — upgrade device for 3D interface</span>
                </div>
            </div>

            <OverlayManager cameraRef={null}/>
        </>

    )
}
