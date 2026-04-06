import OverlayManager from "../overlays/OverlayManager.tsx";

export default function Main2D(){
    return (
        <>
            <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
                <div
                    className="absolute inset-0 bg-[url('/bg2d.png')] bg-cover bg-center
                   portrait:w-[100vh] portrait:h-[100vw]
                   portrait:top-1/2 portrait:left-1/2
                   portrait:-translate-x-1/2 portrait:-translate-y-1/2
                   portrait:rotate-90"
                ></div>


                <img
                    src="/ship.png"
                    alt="ship"
                    className="absolute left-1/3 bottom-1/3 h-auto z-10 w-96"
                />

                <img
                    src="/star.png"
                    alt="star"
                    className="absolute top-1/12 h-auto z-10 w-96"
                />

                <img
                    src="/station.png"
                    alt="star"
                    className="absolute left-1/12 bottom-2/12 h-auto z-10 w-96"
                />

            </div>

            <OverlayManager cameraRef={null}/>
        </>

    )
}