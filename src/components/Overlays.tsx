import {useZoom, ZoomType} from "../hooks/ZoomContext.tsx";


export default function Overlays() {
    const { zoomFocus, setZoomFocus } = useZoom();

    if (zoomFocus == ZoomType.PROJECTS){
        return (
            <div className="absolute right-0 top-0 w-screen h-screen lg:w-2/3 bg-white/50" onClick={() => setZoomFocus(ZoomType.NONE)}>
                Projects Here
            </div>
        )
    }
    return null
}