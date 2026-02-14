import {useZoom, ZoomType} from "../hooks/ZoomContext.tsx";
import type {RefObject} from "react";
import type {CameraControls} from "@react-three/drei";


export default function Overlays({cameraRef}: {cameraRef: RefObject<CameraControls>}) {
    const { zoomFocus, setZoomFocus } = useZoom();

    function unzoom(){
        cameraRef.current.reset(true).then(
            () => setZoomFocus(ZoomType.NONE)
        )
    }

    if (zoomFocus == ZoomType.PROJECTS){
        return (
            <div className="absolute right-0 top-0 w-screen h-screen lg:w-2/3 bg-white/50" onClick={unzoom}>
                Projects Here
            </div>
        )
    }
    return null
}