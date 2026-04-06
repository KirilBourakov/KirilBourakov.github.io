import OverlayManager from "../overlays/OverlayManager.tsx";
import Star2D from "./Star2D.tsx";
import Ship2D from "./Ship2D.tsx";
import Station2D from "./Station2D.tsx";

export default function Main2D(){
    return (
        <>
            <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
                <div
                    className="absolute inset-0 bg-[url('/bg2d.png')] bg-cover bg-[55%_center] md:bg-center"
                ></div>

                <Star2D />
                <Ship2D />
                <Station2D />
            </div>

            <OverlayManager cameraRef={null}/>
        </>

    )
}
