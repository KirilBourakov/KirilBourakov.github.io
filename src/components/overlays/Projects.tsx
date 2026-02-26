import {Fragment, useEffect, useState} from 'react';
import ProjectsItem from '../overlays/ProjectsItem.tsx';
import data from './projects.json'

export default function Projects({ unzoom } : {unzoom: () => void}) {
    const ALL = 'all'

    const [visible, setVisible] = useState(false);
    const [focus, setFocus] = useState<string | null>(ALL);

    const tags = new Set<string>();
    tags.add(ALL);
    data.forEach((item) => {
        tags.add(item.type)
    })

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 500);
        return () => clearTimeout(timer);
    }, []);

    function zoomOut(){
        setVisible(false)
        unzoom();
    }

    return (
        <div className={`absolute right-0 top-0 w-screen h-screen lg:w-2/3 bg-black/80 backdrop-blur-md overflow-y-scroll transition-all duration-500 ease-in-out ${visible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex m-1 mr-2 sticky top-0 z-20 bg-black/20 backdrop-blur-sm">

                <button
                    onClick={zoomOut}
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

            <div className="flex ml-[1.8%] mb-3">
                <div className="flex w-full mx-2 bg-orange-500">
                    {[...tags].map((tag, index) => (
                        <button
                            key={`tag-${index}`}
                            className="p-3 text-white bg-orange-500 hover:bg-orange-700 hover:cursor-pointer transition-all duration-250"
                            onClick={() => setFocus(tag)}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col pl-[1.8%]">
                {data.map((item, index) => (
                    <Fragment key={index}>
                        {(item.type === focus || focus === 'all') &&
                            <div
                                className="transition-all duration-700 ease-out"
                                style={{
                                    transitionDelay: `${200 + index * 150}ms`,
                                    transform: visible ? 'translateY(0)' : 'translateY(40px)',
                                    opacity: visible ? 1 : 0
                                }}
                            >
                                <ProjectsItem reversed={index % 2 !== 0} data={item} />
                            </div>
                        }
                    </Fragment>
                ))}
            </div>
        </div>
    )
}
