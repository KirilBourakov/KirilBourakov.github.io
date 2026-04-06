import OverlayManager from "../overlays/OverlayManager.tsx";

export default function Main2D(){
    return (
        <>
            <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
                <div
                    className="absolute inset-0 bg-[url('/bg2d.png')] bg-cover bg-[55%_center] md:bg-center"
                ></div>

                <img
                    src="/star.png"
                    alt="Star"
                    className="absolute top-3/12 left-4/10 w-36 md:left-[15%] md:top-2/12  md:w-48 lg:w-64 h-auto z-10"
                />

                <img
                    src="/ship.png"
                    alt="Spaceship"
                    className="absolute top-7/12 left-3/10 w-48 md:left-1/3 md:bottom-1/3 md:w-72 lg:w-96 h-auto z-10"
                />


                <img
                    src="/station.png"
                    alt="Space station"
                    className="absolute top-5/12 left-0 w-56 md:left-[8%] md:top-8/12 md:w-80 lg:w-96 h-auto z-10"
                />

            </div>

            <OverlayManager cameraRef={null}/>
        </>

    )
}