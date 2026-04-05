import {useEffect, useState} from "react";
import BackDrop from "./BackDrop.tsx";
import data from './data/experience.json'

interface Time{
    start: string;
    end: string;
    info: string;
}

interface Items{
    title: string;
    times: Time[];
    cardSubtitle: string;
    mainText: string;
    desc: string[];
}

export default function Experience({ unzoom }: { unzoom: () => void }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 500);
        return () => {
            clearTimeout(timer);
        };
    }, []);

    function zoomOut() {
        setVisible(false)
        unzoom()
    }

    return (
        <BackDrop visible={visible} zoomOut={zoomOut} title={"Experience"} flip={true}>
            <div className="flex flex-col px-6 py-12 md:pl-16 md:pr-34 gap-10 pb-32 w-full">
                <div className="relative border-l border-orange-500/30 ml-2 md:ml-4">
                    {data.map((item, index) => (
                       <Card key={index} item={item} />
                    ))}
                </div>
            </div>
        </BackDrop>
    )
}

function Card({item} : { item: Items }) {
    return (
        <div
            className="mb-14 ml-10 relative group transition-all duration-700 ease-out"
        >
            {/* MARKER */}
            <div className="absolute -left-12.25 top-2 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-orange-500 group-hover:scale-125 transition-transform duration-300"></div>
                <div className="absolute w-8 h-px bg-orange-500/50 -right-4"></div>
            </div>

            <div className="bg-black/40 border border-white/5 p-6 md:p-8 backdrop-blur-xl group-hover:border-orange-500/40 transition-all duration-500 relative overflow-hidden">

                {/* HEADER*/}
                <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-xl md:text-2xl font-bold text-white tracking-widest uppercase font-mono group-hover:text-orange-500 transition-colors duration-500">
                            {item.title}
                        </h3>
                        <div className="flex items-center gap-3">
                            <div className="h-px w-6 bg-orange-500/40 group-hover:w-10 group-hover:bg-orange-500 transition-all duration-500"></div>
                            <span className="text-orange-500/80 font-bold text-md uppercase tracking-wide font-mono group-hover:text-orange-400 transition-colors">
                                {item.cardSubtitle}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
                        {item.times.map((time, tIndex) => (
                           <TimeEntry time={time} key={tIndex}/>
                        ))}
                    </div>
                </div>

                <div className={
                    "relative pt-6 border-t border-white/5  leading-relaxed text-sm  md:text-base font-sans opacity-80 text-gray-400 " +
                    "group-hover:opacity-100 group-hover:text-gray-200 transition-all duration-500"
                }>
                    <p className="pb-1">{item.mainText}</p>

                    <ul className="ml-7">
                        {item.desc.map((item, index) => (
                            <li
                                key={index}
                                className={`relative 
                                    before:content-[''] before:absolute before:-left-5 before:top-1/2 before:-translate-y-1
                                    before:w-3 before:h-3 before:bg-white 
                                    before:[clip-path:polygon(0_0,100%_50%,0_100%)]
                                    group-hover:before:bg-orange-500
                            `}>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>


            </div>
        </div>
    )
}

function TimeEntry({time} : { time: Time}){
    return (
        <div className="flex items-center gap-3 text-xs md:text-sm font-mono whitespace-nowrap">
            <div className="flex items-center gap-2 group-hover:text-orange-400 transition-colors duration-500 text-white/60">
                <span className="font-bold">{time.start}</span>
                <span className="opacity-30">—</span>
                <span className="font-bold">{time.end}</span>
            </div>
            <span className={
                "text-sm bg-white/5 border border-white/10 px-2 py-0.5 uppercase tracking-widest text-white/40 " +
                "group-hover:border-orange-500/30 group-hover:text-orange-300 transition-all duration-500"
            }>
                {time.info}
            </span>
        </div>
    )
}