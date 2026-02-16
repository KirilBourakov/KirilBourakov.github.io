export default function ProjectsItem({reversed}: { reversed: boolean }) {
    return (
        <div className={"flex mt-3 mx-2"}>
            {reversed ?
                <>
                    <Text />
                    <Image reversed={reversed} />
                </>
            :
                <>
                    <Image reversed={reversed} />
                    <Text />
                </>
            }
        </div>
    )
}

function Text(){
    return (
        <div className={`flex-2 text-white bg-orange-400 p-3`}>
            <div className={"flex pb-3"}>
                <h2 className={"text-2xl"}>Project</h2>
            </div>
            <hr className="w-11/12" />

            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel elit cursus odio tincidunt pellentesque. Nam dolor nibh, dignissim rhoncus sem sit amet, fringilla cursus quam. Praesent consectetur sed enim vel aliquam. Curabitur vulputate lacinia massa, eu ultricies ex tincidunt id. Aliquam erat volutpat. Sed urna dolor, dapibus eget tortor a, fringilla condimentum purus. Proin a imperdiet ligula, eu accumsan risus.
            </p>
        </div>
    )
}

function Image({reversed}: { reversed: boolean }) {
    return (
        <div className={`flex-1 ${reversed ? 'ml-2' : 'mr-2'}`}>
            <img
                src={"https://christopherscottedwards.com/wp-content/uploads/2018/07/Generic-Profile.jpg"}
                alt={"Generic Image"}
                className="w-full h-full object-cover"
            />
        </div>
    )
}