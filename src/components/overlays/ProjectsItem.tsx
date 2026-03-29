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
        <div className={`flex mb-4 mx-2 ${reversed ? 'flex-row-reverse' : 'flex-row'}`}>
            {hasIcons && <Image reversed={reversed} data={data} />}
            <Text data={data} fullWidth={!hasIcons}/>
        </div>
    )
}

function Text({data, fullWidth}: {data: DataType, fullWidth: boolean}) {
    return (
        <div className={`${fullWidth ? 'flex-1' : 'flex-2'} text-white bg-black/50 p-4 shadow-md`}>
            <div className={"flex pb-2 justify-between items-baseline"}>
                <h2 className={"text-2xl font-bold"}>{data.title}</h2>
                <span className="text-orange-400 font-mono text-sm">
                    {data.start === data.end ? data.start : `${data.start} - ${data.end}`}
                </span>
            </div>
            <hr className="w-full border-orange-400 mb-3" />

            <div className="text-sm leading-relaxed">
                <p className="mb-3">
                    {data.main}
                </p>
                <ul className={"list-disc ml-5 space-y-1"}>
                    {data.points.map((point, index) => (
                        <li key={index}>{point}</li>
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
        <div className={`flex-1 ${reversed ? 'ml-2' : 'mr-2'} relative overflow-hidden shadow-lg bg-gray-900 h-64 rounded-sm border border-white/10`}>
            <div className="w-full h-full group">
                <img
                    src={getSrc()}
                    alt={getAlt()}
                    className="w-full h-full object-cover object-top transition-all duration-3000 ease-in-out group-hover:object-bottom"
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