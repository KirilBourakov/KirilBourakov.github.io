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
        <div
            className="absolute top-0 right-0 bg-black/40 backdrop-blur-md text-white p-4 pt-2 border-l-2 border-orange-500/50 w-full sm:w-2/3 md:w-1/2 lg:w-1/4 transition-all duration-500"
            style={{clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 8% 100%)'}}
        >
            <div className="ml-6 flex flex-col gap-3">
                <div className="border-b border-orange-500/20 pb-1 mb-1">
                    <p className="text-sm font-mono text-orange-500 uppercase tracking-wide opacity-80">Subject Identification</p>
                    <h1 className="text-2xl font-bold tracking-tight uppercase">Kiril Bourakov</h1>
                </div>

                <div className="space-y-1 text-sm md:text-base">
                    <div className="flex items-center gap-2 group">
                        <span className="font-mono text-sm text-orange-400 uppercase w-12 opacity-60">Email</span>
                        <span className="font-mono tracking-tight flex-1 text-xs md:text-sm">{email}</span>
                        <button
                            className="hover:text-orange-400 transition-all hover:scale-110 select-none cursor-pointer p-1"
                            onClick={handleCopy}
                            title="Copy Email"
                        >
                            {isCopied ? (
                                <MdCheck className="text-md text-orange-500"/>
                            ) : (
                                <MdContentCopy className="text-md opacity-40 hover:opacity-100"/>
                            )}
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="font-mono text-sm text-orange-400 uppercase w-12 opacity-60">Phone</span>
                        <span className="font-mono tracking-tight text-xs md:text-sm">(506) 997-0081</span>
                    </div>
                </div>

                <div className="flex justify-between items-center mt-2 border-t border-orange-500/10 pt-3">
                    <div className="flex gap-4">
                        <IconContext.Provider value={{size: "22", className: "hover:text-orange-500 transition-colors cursor-pointer opacity-80 hover:opacity-100"}}>
                            <div onClick={() => window.open(githubUrl, '_blank')} title="GitHub">
                                <FaGithub />
                            </div>
                            <div onClick={() => window.open(linkedinUrl, '_blank')} title="LinkedIn">
                                <FaLinkedin />
                            </div>
                        </IconContext.Provider>
                    </div>
                    <div className="h-1 w-12 bg-orange-500/40"></div>
                </div>
            </div>
        </div>
    )
}
