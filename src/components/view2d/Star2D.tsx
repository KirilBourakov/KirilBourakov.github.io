import {useState} from "react";
import {useZoom, ZoomType} from "../../hooks/ZoomContext.tsx";
import Label2D from "./Label2D.tsx";

export default function Star2D() {
    const { zoomFocus, setZoomFocus } = useZoom();
    const isNotZoomed = zoomFocus === ZoomType.NONE;
    const [hover, setHover] = useState(false);

    const handleClick = () => {
        if (isNotZoomed) {
            setZoomFocus(ZoomType.RESUME);
        }
    };

    return (
        <div 
            className="absolute top-3/12 left-4/10 w-36 md:left-[15%] md:top-2/12  md:w-48 lg:w-64 h-auto z-10"
        >
            <div 
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
                        align="right"
                        className="top-3/4 left-[80%]"
                    />
                )}
            </div>
        </div>
    )
}
