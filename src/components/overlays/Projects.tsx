import {useEffect, useRef, useState} from 'react';
import ProjectsItem from '../overlays/ProjectsItem.tsx';
import data from './projects.json'
import {FaArrowDown, FaArrowUp} from "react-icons/fa";

export default function Projects({ unzoom } : {unzoom: () => void}) {
    const ALL = 'all'

    const [isScrolled, setIsScrolled] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null)
    const [visible, setVisible] = useState(false);
    const [focus, setFocus] = useState<string | null>(ALL);
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');


    const tags = new Set<string>();
    tags.add(ALL);
    data.forEach((item) => {
        tags.add(item.type)
    })

    useEffect(() => {
        const handleScroll = () => {
            if (scrollRef.current) {
                setIsScrolled(scrollRef.current.scrollTop > 20);
            }
        };

        const currentRef = scrollRef.current;
        if (currentRef) {
            currentRef.addEventListener('scroll', handleScroll);
        }

        const timer = setTimeout(() => setVisible(true), 500);
        return () => {
            clearTimeout(timer);
            if (currentRef) {
                currentRef.removeEventListener('scroll', handleScroll);
            }
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
        <div
            ref={scrollRef}
            className={`absolute right-0 top-0 w-full h-full lg:w-2/3 bg-black/30 backdrop-blur-md 
            overflow-y-auto overflow-x-hidden transition-all duration-500 ease-in-out ${visible ? 'opacity-100' : 'opacity-0'}`}
        >
            <div
                className={
                    `flex sticky top-0 z-20 p-2 transition-colors duration-300 
                    ${isScrolled ? 'bg-black/20 backdrop-blur-sm' : 'bg-transparent'}`
                }
            >
                <button
                    onClick={zoomOut}
                    className={
                        "bg-black/50 border-orange-500 border-e-2 px-12 py-2 text-white hover:bg-orange-700 hover:cursor-pointer transition-all duration-500" +
                        "sm:-mr-[64px] sm:border-e-0 sm:[clip-path:polygon(0%_0%,_calc(100%-32px)_0%,_100%_100%,_32px_100%)] "
                    }
                >
                    Back
                </button>

                <div
                    className={"bg-black/50 flex-1 flex p-1 select-none sm:[clip-path:polygon(0%_0%,_100%_0%,_100%_100%,_32px_100%)]"}
                >
                    <h1 className="text-2xl md:text-3xl m-auto text-white font-mono uppercase tracking-widest">Projects</h1>
                </div>
            </div>

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
        </div>
    )
}
