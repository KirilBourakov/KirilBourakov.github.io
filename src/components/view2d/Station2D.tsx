import {useRef, useState} from "react";
import {useZoom, ZoomType} from "../../hooks/ZoomContext.tsx";
import Label2D from "./Label2D.tsx";
import {useControls} from "react-zoom-pan-pinch";

export default function Station2D() {
    const { zoomFocus, setZoomFocus } = useZoom();
    const isNotZoomed = zoomFocus === ZoomType.NONE;
    const [hover, setHover] = useState(false);
    const imgContainerRef = useRef<HTMLDivElement>(null);
    const { zoomToElement } = useControls();

    const handleClick = () => {
        if (isNotZoomed) {
            zoomToElement("station-zoom-target", 2, 600, "easeOut");
            setZoomFocus(ZoomType.EXPERIENCE);
        }
    };

    return (
        <div 
            className="absolute top-5/12 left-0 w-56 md:left-[8%] md:top-8/12 md:w-80 lg:w-96 h-auto z-10"
        >
            <div
                id="station-zoom-target"
                className="absolute left-0 md:-left-[8vw] top-1/2 -translate-y-1/2 w-1 h-1 bg-transparent"
            />

            <div 
                ref={imgContainerRef}
                id="station-container"
                className={`relative transition-all duration-300 cursor-pointer ${hover && isNotZoomed ? 'scale-110' : ''}`}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={handleClick}
            >
                <img
                    src="/station.png"
                    alt="Space station"
                    className="w-full h-auto"
                />
                {isNotZoomed && (
                    <Label2D
                        hover={hover}
                        setHover={setHover}
                        handleClick={handleClick}
                        text="[ EXPERIENCE ]"
                        imgRef={imgContainerRef}
                        align="right"
                        className="top-3/4 left-[80%]"
                    />
                )}
            </div>
        </div>
    )
}
