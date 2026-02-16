import {useZoom, ZoomType} from "../../hooks/ZoomContext.tsx";
import type {RefObject} from "react";
import type {CameraControls} from "@react-three/drei";
import Projects from "../overlays/Projects.tsx";


export default function OverlayManager({cameraRef}: {cameraRef: RefObject<CameraControls>}) {
    const { zoomFocus, setZoomFocus } = useZoom();

    function unzoom(){
        cameraRef.current.reset(true).then(
            () => setZoomFocus(ZoomType.NONE)
        )
    }

    if (zoomFocus == ZoomType.PROJECTS){
        return <Projects unzoom={unzoom} />
    }
    return null
}
