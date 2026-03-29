import {useState} from "react";

interface DataType{
        title: string
        type: string
        main: string
        points: string[]
        icons: {
            img: string
            alt: string
        }[] | null
        start: number
        end: number
}

export default function ProjectsItem({reversed, data}: { reversed: boolean, data: DataType }) {
    const hasIcons = data.icons && data.icons.length > 0;
    return (
        <div className={`flex flex-col ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} mb-8 bg-black/40 border border-white/5 shadow-2xl overflow-hidden`}>
            {hasIcons && <Image reversed={reversed} data={data} />}
            <Text data={data} fullWidth={!hasIcons}/>
        </div>
    )
}

function Text({data, fullWidth}: {data: DataType, fullWidth: boolean}) {
    return (
        <div className={`${fullWidth ? 'w-full' : 'lg:flex-[2]'} text-white p-6 flex flex-col`}>
            <div className={"flex pb-2 justify-between items-baseline gap-4"}>
                <h2 className={"text-xl md:text-2xl font-bold tracking-tight"}>{data.title}</h2>
                <span className="text-orange-400 font-mono text-xs md:text-sm whitespace-nowrap bg-orange-400/10 px-2 py-0.5 rounded border border-orange-400/20">
                    {data.start === data.end ? data.start : `${data.start} - ${data.end}`}
                </span>
            </div>
            <hr className="w-full border-orange-500/30 mb-4" />

            <div className="text-sm md:text-base leading-relaxed text-gray-300">
                <p className="mb-4">
                    {data.main}
                </p>
                <ul className={"list-disc ml-5 space-y-2 marker:text-orange-500"}>
                    {data.points.map((point, index) => (
                        <li key={index} className="pl-1">{point}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

function Image({reversed, data}: { reversed: boolean, data: DataType }) {
    const [index, setIndex] = useState(0)

    function handleClick(dir: 1 | -1){
        if (data.icons && data.icons.length > 0){
            let newIndex = (index + dir) % data.icons.length
            newIndex = newIndex < 0 ? data.icons.length - 1 : newIndex
            setIndex(newIndex)
        }
    }

    function getSrc(){
        return `/img/${data.icons![index].img}`
    }

    function getAlt(){
        return data.icons![index].alt
    }

    return (
        <div className={`w-full lg:flex-1 relative overflow-hidden bg-gray-900 h-64 md:h-80 lg:h-auto border-b lg:border-b-0 ${reversed ? 'lg:border-l' : 'lg:border-r'} border-white/10`}>
            <div className="w-full h-full group">
                <img
                    src={getSrc()}
                    alt={getAlt()}
                    className="w-full h-full object-cover object-top transition-all duration-[3000ms] ease-in-out lg:group-hover:object-bottom"
                />
            </div>
            {data.icons && data.icons.length > 1 && (
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded backdrop-blur-sm border border-white/10 pointer-events-none">
                    +{data.icons.length - 1} more
                </div>
            )}
            {data.icons && data.icons.length > 1 && (
                ["\u2192", "\u2190"].map((icon, iconIdx) => (
                    <div
                        key={iconIdx}
                        className={
                            `hover:cursor-pointer hover:bg-black/70 select-none absolute top-1/2 -translate-y-1/2 bg-black/50 
                            transition-all duration-250 text-white text-[12px] px-1.5 py-0.5 rounded backdrop-blur-sm 
                            border border-white/10 z-10 ${iconIdx === 0 ? "right-1" : "left-1"}`
                        }
                        onClick={() => handleClick(iconIdx === 0 ? 1 : -1)}
                    >
                        {icon}
                    </div>
                ))
            )}
        </div>
    )
}