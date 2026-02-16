export default function Projects({ unzoom } : {unzoom: () => void}) {


    return (
        <div className={`absolute right-0 top-0 w-screen h-screen lg:w-2/3 bg-black/50`}>
            <div className="flex m-1">

                <button
                    onClick={unzoom}
                    className={" bg-orange-500 basis-2/12 -mr-4 text-white hover:bg-orange-700 hover:cursor-pointer"}
                    style={{ clipPath: 'polygon(0% 0%, 85% 0%, 100% 100%, 15% 100%)' }}
                >
                    Back
                </button>

                <div
                    className={"bg-orange-400 basis-full flex p-1 select-none"}
                    style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 2.5% 100%)' }}
                >
                    <h1 className="text-3xl m-auto text-white">Projects</h1>
                </div>

            </div>

            {/*<hr className="bg-orange-500 text-orange-500 w-11/12 mx-auto" />*/}
        </div>
    )
}