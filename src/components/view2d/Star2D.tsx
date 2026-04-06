import {useRef, useState} from "react";
import {useZoom, ZoomType} from "../../hooks/ZoomContext.tsx";
import Label2D from "./Label2D.tsx";
import {useControls} from "react-zoom-pan-pinch";

export default function Star2D() {
    const { zoomFocus, setZoomFocus } = useZoom();
    const isNotZoomed = zoomFocus === ZoomType.NONE;
    const [hover, setHover] = useState(false);
    const imgContainerRef = useRef<HTMLDivElement>(null);
    const { zoomToElement } = useControls();

    const handleClick = () => {
        if (isNotZoomed) {
            zoomToElement("star-zoom-target", 2.5, 600, "easeOut");
            setZoomFocus(ZoomType.RESUME);
        }
    };

    return (
        <div className={"absolute top-3/12 left-4/10 md:left-[15%] md:top-2/12 pr-96 md:pr-108 lg:pr-124"} id="star-zoom-target">
            <div
                className="relative w-36 md:w-48 lg:w-64 h-auto z-10"
            >
                <div
                    ref={imgContainerRef}
                    className={`relative transition-all duration-300 cursor-pointer ${hover && isNotZoomed ? 'scale-110' : ''}`}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    onClick={handleClick}
                >
                    <img
                        src="/star.png"
                        alt="Star"
                        className="w-full h-auto"
                    />
                    {isNotZoomed && (
                        <Label2D
                            hover={hover}
                            setHover={setHover}
                            handleClick={handleClick}
                            text="[ RESUME ]"
                            imgRef={imgContainerRef}
                            align="right"
                            className="top-3/4 left-[80%]"
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
