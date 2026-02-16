import ProjectsItem from '../overlays/ProjectsItem.tsx';
import data from './projects.json'

export default function Projects({ unzoom } : {unzoom: () => void}) {
    return (
        <div className={`absolute right-0 top-0 w-screen h-screen lg:w-2/3 bg-black/50 overflow-y-scroll`}>
            <div className="flex m-1 mr-2 mb-3">

                <button
                    onClick={unzoom}
                    className={" bg-orange-500 basis-2/12 -mr-4 text-white hover:bg-orange-700 hover:cursor-pointer transition-all duration-500"}
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

            <div className="flex flex-col pl-[1.8%]">
                {data.map((item, index) => (
                    <ProjectsItem reversed={false} data={item} key={index}/>
                ))}
            </div>
        </div>
    )
}