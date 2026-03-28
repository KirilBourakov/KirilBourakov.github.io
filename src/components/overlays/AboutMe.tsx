import {MdCheck, MdContentCopy} from "react-icons/md";
import {useState} from "react";
import {FaGithub, FaLinkedin} from "react-icons/fa";
import { IconContext } from "react-icons";

export default function AboutMe() {
    const [isCopied, setIsCopied] = useState(false);
    const email = "kirbou06012@gmail.com";
    const githubUrl = "https://github.com/KirilBourakov"
    const linkedinUrl = "https://www.linkedin.com/in/kiril-bourakov/"

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 1500);
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    }

    return (
        <>
            <div
                className="text-xl absolute top-0 right-0 bg-black/30 text-white w-1/4 p-2 pb-3"
                style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 5% 100%)' }}
            >
                <div className="ml-6">
                    <h1 className="font-bold">Kiril Bourakov</h1>
                    <div className="flex items-center px-1">
                        <h2 className="mr-1 leading-none">Email:</h2>
                        <h2 className="mr-1 leading-none">{email}</h2>
                        <div>
                            <button
                                className="hover:cursor-pointer transition-all hover:scale-110 translate-y-[2px] select-none"
                                onClick={handleCopy}
                            >
                                {isCopied ? (
                                    <MdCheck className="text-lg text-green-700" />
                                ) : (
                                    <MdContentCopy className="text-lg" />
                                )}
                            </button>
                        </div>
                    </div>
                    <h2 className="px-1">Phone: (506) 997-0081</h2>

                    <IconContext.Provider value={{ size: "20" }}>
                        <div className="flex">
                            <div
                                className="ml-auto hover:cursor-pointer transition-all hover:scale-110"
                                onClick={() => window.open(githubUrl, '_blank')}
                            >
                                <FaGithub scale={5} />
                            </div>
                            <div
                                className="mr-3 hover:cursor-pointer transition-all hover:scale-110"
                                onClick={() => window.open(linkedinUrl, '_blank')}
                            >
                                <FaLinkedin scale={5} />
                            </div>
                        </div>
                    </IconContext.Provider>
                </div>

            </div>
        </>
    )
}