import {useEffect, useState} from 'react';
import ProjectsItem from '../overlays/ProjectsItem.tsx';
import {FaArrowDown, FaArrowUp} from "react-icons/fa";
import BackDrop from "./BackDrop.tsx";
import data from './data/projects.json'

export default function Projects({ unzoom } : {unzoom: () => void}) {
    const ALL = 'all'

    const [visible, setVisible] = useState(false);
    const [focus, setFocus] = useState<string | null>(ALL);
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');


    const tags = new Set<string>();
    tags.add(ALL);
    data.forEach((item) => {
        tags.add(item.type)
    })

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 500);
        return () => {
            clearTimeout(timer);
        };
    }, []);

    function zoomOut(){
        setVisible(false)
        unzoom();
    }

    const filteredAndSortedData = data
        .filter(item => focus === ALL || item.type === focus)
        .sort((a, b) => {
            if (sortOrder === 'newest') {
                return b.end - a.end || b.start - a.start;
            } else {
                return a.end - b.end || a.start - b.start;
            }
        });

    return (
        <BackDrop visible={visible} zoomOut={zoomOut} title={"Projects"}>
            <div className="flex flex-col lg:flex-row px-4 mt-4 mb-6 gap-3">
                <div className="flex flex-wrap flex-1 bg-black/30 border border-white/10 p-1">
                    {[...tags].map((tag, index) => (
                        <button
                            key={`tag-${index}`}
                            className={
                                `flex-1 min-w-[80px] p-2 text-xs md:text-sm text-white hover:cursor-pointer transition-all duration-250 font-bold uppercase tracking-wider
                                ${tag === focus ? "bg-orange-700/40 border-b-2 border-orange-500" : "hover:bg-white/5 border-b-2 border-transparent"}`
                            }
                            onClick={() => setFocus(tag)}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
                <div className="flex bg-black/30 border border-white/10 p-1">
                    <button
                        className="p-2 text-xs md:text-sm text-white hover:cursor-pointer transition-all duration-250 font-bold border-orange-500 hover:border-2 w-full uppercase tracking-wider"
                        onClick={() => setSortOrder(prev => prev === 'newest' ? 'oldest' : 'newest')}
                    >
                        {sortOrder === 'newest' ?
                            <div className="flex justify-center items-center gap-2">
                                <FaArrowDown className="text-orange-500" />
                                <span>Newest</span>
                            </div>
                        :
                            <div className="flex justify-center items-center gap-2">
                                <FaArrowUp className="text-orange-500" />
                                <span>Oldest</span>
                            </div>
                        }
                    </button>
                </div>
            </div>

            <div className="flex flex-col px-4 gap-6 pb-20">
                {filteredAndSortedData.map((item, index) => (
                    <div
                        key={`${item.title}-${sortOrder}-${focus}`}
                        className="transition-all duration-700 ease-out"
                        style={{
                            transitionDelay: `${200 + index * 150}ms`,
                            transform: visible ? 'translateY(0)' : 'translateY(40px)',
                            opacity: visible ? 1 : 0
                        }}
                    >
                        <ProjectsItem reversed={index % 2 !== 0} data={item} />
                    </div>
                ))}
            </div>
        </BackDrop>
    )
}
