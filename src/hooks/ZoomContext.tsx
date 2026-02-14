import React, {createContext, useContext, useMemo, useState} from "react";

export const ZoomType = {
    NONE: "NONE",
    PROJECTS: "PROJECTS",
} as const;
export type ZoomType = (typeof ZoomType)[keyof typeof ZoomType];

interface ContextType {
    zoomFocus: ZoomType,
    setZoomFocus:  React.Dispatch<React.SetStateAction<ZoomType>>
}

const ZoomContext = createContext<ContextType | undefined>(undefined);

export function ZoomContextProvider({ children }: { children: React.ReactNode }) {
    const [zoomFocus, setZoomFocus] = useState<ZoomType>(ZoomType.NONE)
    const value = useMemo<ContextType>(
        () => ({ zoomFocus, setZoomFocus }),
        [zoomFocus]
    );

    return (
        <ZoomContext.Provider value={value}>
            {children}
        </ZoomContext.Provider>
    )
}

export function useZoom() {
    const context = useContext(ZoomContext);

    if (context === undefined) {
        throw new Error("useZoom must be used within a ZoomContextProvider");
    }

    return context;
}