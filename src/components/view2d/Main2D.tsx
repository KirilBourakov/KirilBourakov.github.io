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

            <OverlayManager cameraRef={null}/>
        </>

    )
}
