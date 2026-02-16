
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
    const icon = data.icons && data.icons.length > 0 ? data.icons[0] : null;
    const src = icon ? `/img/${icon.img}` : "https://christopherscottedwards.com/wp-content/uploads/2018/07/Generic-Profile.jpg";
    const alt = icon ? icon.alt : "Placeholder Image";

    return (
        <div className={`flex-1 ${reversed ? 'ml-2' : 'mr-2'} relative overflow-hidden shadow-lg bg-gray-900 h-64 rounded-sm border border-white/10 group`}>
            <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover object-top transition-all duration-3000 ease-in-out group-hover:object-bottom cursor-zoom-in"
            />
            {data.icons && data.icons.length > 1 && (
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded backdrop-blur-sm border border-white/10">
                    +{data.icons.length - 1} more
                </div>
            )}
        </div>
    )
}