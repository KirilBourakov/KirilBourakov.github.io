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
}

export default function ProjectsItem({reversed, data}: { reversed: boolean, data: DataType }) {
    return (
        <div className={`flex mb-4 mx-2 ${reversed ? 'flex-row-reverse' : 'flex-row'}`}>
            <Image reversed={reversed} data={data} />
            <Text data={data}/>
        </div>
    )
}

function Text({data}: {data: DataType}) {
    return (
        <div className={`flex-2 text-white bg-orange-400 p-4 shadow-md`}>
            <div className={"flex pb-2"}>
                <h2 className={"text-2xl font-bold"}>{data.title}</h2>
            </div>
            <hr className="w-full border-white/30 mb-3" />

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
        if (data.icons && data.icons.length > 0){
            return `/img/${data.icons[index].img}`
        }
        return "https://christopherscottedwards.com/wp-content/uploads/2018/07/Generic-Profile.jpg"
    }

    function getAlt(){
        if (data.icons && data.icons.length > 0){
            return data.icons[index].alt
        }
        return "Placeholder Image"
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