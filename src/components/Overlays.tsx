import {useZoom, ZoomType} from "../hooks/ZoomContext.tsx";


export default function Overlays() {
    const { zoomFocus } = useZoom();

    return (
        <div className="absolute right-0 top-0 w-full h-full lg:w-1/3 bg-white/50">
            Projects Here
        </div>
    )
}