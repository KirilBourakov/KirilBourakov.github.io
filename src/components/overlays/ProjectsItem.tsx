export default function ProjectsItem(){
    return (
        <div className={"flex"}>
            <div className={"flex-1"}>
                <img
                    src={"https://christopherscottedwards.com/wp-content/uploads/2018/07/Generic-Profile.jpg"}
                    alt={"Generic Image"}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className={"flex-2 mx-2 text-white bg-orange-400 p-3"}>
                <div className={"flex pb-3"}>
                    <h2 className={"text-2xl"}>Project</h2>
                </div>
                <hr className="w-11/12" />

                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel elit cursus odio tincidunt pellentesque. Nam dolor nibh, dignissim rhoncus sem sit amet, fringilla cursus quam. Praesent consectetur sed enim vel aliquam. Curabitur vulputate lacinia massa, eu ultricies ex tincidunt id. Aliquam erat volutpat. Sed urna dolor, dapibus eget tortor a, fringilla condimentum purus. Proin a imperdiet ligula, eu accumsan risus.
                </p>
            </div>
        </div>
    )
}