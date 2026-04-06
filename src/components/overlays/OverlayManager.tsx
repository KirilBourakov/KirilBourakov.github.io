import {useZoom, ZoomType} from "../../hooks/ZoomContext.tsx";
import type {RefObject} from "react";
import type {CameraControls} from "@react-three/drei";
import Projects from "../overlays/Projects.tsx";
import AboutMe from "./AboutMe.tsx";
import Resume from "./Resume.tsx";
import Experience from "./Experience.tsx";


export default function OverlayManager({cameraRef}: {cameraRef: RefObject<CameraControls> | null}) {
    const { zoomFocus, setZoomFocus } = useZoom();

    function unzoom(){
        if (cameraRef){
            cameraRef.current.reset(true).then(
                () => setZoomFocus(ZoomType.NONE)
            )
        }
    }

    if (zoomFocus == ZoomType.PROJECTS){
        return <Projects unzoom={unzoom} />
    }

    if (zoomFocus == ZoomType.RESUME){
        return <Resume unzoom={unzoom}/>
    }

    if (zoomFocus == ZoomType.EXPERIENCE){
        return <Experience unzoom={unzoom}/>
    }

    return <AboutMe />
}
