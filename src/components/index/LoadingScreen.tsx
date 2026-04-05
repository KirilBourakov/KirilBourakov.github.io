import { useProgress } from "@react-three/drei";
import React, {useState} from "react";

export default function LoadingScreen() {
    const { active, progress } = useProgress();
    const [isGone, setIsGone] = useState(false);

    const handleTransitionEnd = () => {
        if (!active && progress === 100) {
            setIsGone(true);
        }
    };

    return (
        <div
            onTransitionEnd={handleTransitionEnd}
            className={`
                fixed inset-0 flex flex-col items-center justify-center bg-black 
                transition-opacity duration-1000 ease-in-out 
                ${!active && progress === 100 ? "opacity-0" : "opacity-100"}
                ${isGone ? "hidden" : "z-1000"}
        `}>
            <div className="flex flex-col items-center gap-8 w-64 md:w-80">

                {/* RING */}
                <div className="relative flex items-center justify-center w-24 h-24">
                    <div className="absolute inset-0 border-2 border-orange-500/10 rounded-full"></div>
                    <div
                        className="absolute inset-0 border-2 border-orange-500 rounded-full transition-all duration-300 -rotate-90"
                        style={{ '--progress': `${progress}%` } as React.CSSProperties}
                    >
                        <div className="size-full [clip-path:polygon(50%_50%,-50%_-50%,var(--progress)_-50%,var(--progress)_150%,-50%_150%)]" />
                    </div>

                    <div className="text-orange-500 font-mono text-xl font-bold tracking-tighter">
                        {Math.round(progress)}%
                    </div>
                </div>

                <div className="w-full space-y-4">
                    <div className="flex justify-between items-end font-mono text-[10px] md:text-xs tracking-[0.2em] text-orange-500/60 uppercase">
                        <span>Systems Link</span>
                        <span className="animate-pulse">Active</span>
                    </div>

                    <div className="relative h-0.5 w-full bg-white/5 overflow-hidden">
                        <div 
                            className="absolute inset-y-0 left-0 bg-orange-500 transition-all duration-300 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <div className="flex flex-col gap-1 font-mono text-sm md:text-md text-white/30 uppercase tracking-widest">
                        <div className="flex justify-between">
                            <span>Initializing Core...</span>
                            <span>OK</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Mapping Viewport...</span>
                            <span>{progress > 40 ? 'OK' : 'WAIT'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Syncing Station...</span>
                            <span>{progress > 80 ? 'OK' : 'WAIT'}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute top-12 left-12 w-32 h-32 border-l border-t border-white/5"></div>
            <div className="absolute bottom-12 right-12 w-32 h-32 border-r border-b border-white/5"></div>
        </div>
    );
}
