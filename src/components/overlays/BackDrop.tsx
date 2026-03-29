import {type ReactNode, useEffect, useRef, useState} from "react";

export default function BackDrop({ children, visible, zoomOut, title }: { children: ReactNode, visible: boolean, zoomOut: () => void, title: string }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        const handleScroll = () => {
            if (scrollRef.current) {
                setIsScrolled(scrollRef.current.scrollTop > 20);
            }
        };

        const currentRef = scrollRef.current;
        if (currentRef) {
            currentRef.addEventListener('scroll', handleScroll);
        }

        const timer = setTimeout(() => setVisible(true), 500);
        return () => {
            clearTimeout(timer);
            if (currentRef) {
                currentRef.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    return (
        <div
            ref={scrollRef}
            className={`absolute right-0 top-0 w-full h-full lg:w-2/3 bg-black/40 backdrop-blur-xl 
            overflow-y-auto overflow-x-hidden transition-all duration-500 ease-in-out z-50
            ${visible ? 'opacity-100' : 'opacity-0'}`}
        >

            <div
                className={`flex sticky top-0 z-20 transition-all duration-300 ${
                    isScrolled
                        ? 'bg-black/50 backdrop-blur-md p-1'
                        : 'bg-transparent p-2'
                }`}
            >
                <button
                    onClick={zoomOut}
                    className={
                        "bg-black/50 border-orange-500 border-e-2 px-12 py-2 text-white hover:bg-orange-700 hover:cursor-pointer transition-all duration-500" +
                        "sm:-mr-[64px] sm:border-e-0 sm:[clip-path:polygon(0%_0%,_calc(100%-32px)_0%,_100%_100%,_32px_100%)] "
                    }
                >
                    Back
                </button>

                <div
                    className={"bg-black/50 flex-1 flex p-1 select-none sm:[clip-path:polygon(0%_0%,_100%_0%,_100%_100%,_32px_100%)]"}
                >
                    <h1 className="text-2xl md:text-3xl m-auto text-white font-mono uppercase tracking-widest">{title}</h1>
                </div>
            </div>

            {children}

        </div>
    )
}