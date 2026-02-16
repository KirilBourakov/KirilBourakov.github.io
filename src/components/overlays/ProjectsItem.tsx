
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
        <div className={"flex mb-3 mx-2"}>
            {reversed ?
                <>
                    <Text data={data}/>
                    <Image reversed={reversed} data={data} />
                </>
            :
                <>
                    <Image reversed={reversed} data={data} />
                    <Text data={data}/>
                </>
            }
        </div>
    )
}

function Text({data}: {data: DataType}) {
    return (
        <div className={`flex-2 text-white bg-orange-400 p-3`}>
            <div className={"flex pb-3"}>
                <h2 className={"text-2xl"}>{data.title}</h2>
            </div>
            <hr className="w-11/12" />

            <div>
                <p>
                    {data.main}
                </p>
                <ul className={"list-disc ml-4"}>
                    {data.points.map((point, index) => (
                        <li key={index}>{point}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

function Image({reversed, data}: { reversed: boolean, data: DataType }) {
    const src= data.icons == null ? "https://christopherscottedwards.com/wp-content/uploads/2018/07/Generic-Profile.jpg" : `/img/${data.icons[0].img}`
    const alt = data.icons == null ? "Placeholder Image" : data.icons[0].alt
    return (
        <div className={`flex-1 ${reversed ? 'ml-2' : 'mr-2'}`}>
            <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover max-h-70"
            />
        </div>
    )
}