import {useState} from "react";
import {useZoom, ZoomType} from "../../hooks/ZoomContext.tsx";
import Label2D from "./Label2D.tsx";

export default function Ship2D() {
    const { zoomFocus, setZoomFocus } = useZoom();
    const isNotZoomed = zoomFocus === ZoomType.NONE;
    const [hover, setHover] = useState(false);

    const handleClick = () => {
        if (isNotZoomed) {
            setZoomFocus(ZoomType.PROJECTS);
        }
    };

    return (
        <div 
            className="absolute top-7/12 left-3/10 w-48 md:left-1/3 md:bottom-1/3 md:top-auto md:w-72 lg:w-96 h-auto z-10"
        >
            <div 
                className={`relative transition-all duration-300 cursor-pointer ${hover && isNotZoomed ? 'scale-110' : ''}`}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={handleClick}
            >
                <img
                    src="/ship.png"
                    alt="Spaceship"
                    className="w-full h-auto"
                />
                {isNotZoomed && (
                    <Label2D
                        hover={hover}
                        setHover={setHover}
                        handleClick={handleClick}
                        text="[ PROJECTS ]"
                        align="left"
                        className="top-1/2 left-[10%]"
                    />
                )}
            </div>
        </div>
    )
}
