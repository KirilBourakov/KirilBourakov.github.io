import { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import BackDrop from "./BackDrop.tsx";

// Use a local worker for better performance and reliability with Vite
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export default function Resume({ unzoom }: { unzoom: () => void }) {
    const [visible, setVisible] = useState(false);
    const [containerWidth, setContainerWidth] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 100);

        const handleResize = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.clientWidth);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    function zoomOut() {
        setVisible(false)
        unzoom()
    }

    return (
        <BackDrop visible={visible} zoomOut={zoomOut} title={"Resume"}>

            <div className="flex flex-col items-center p-4 md:p-8 gap-8 relative" ref={containerRef}>
                <div className="relative group max-w-full">
                    {/* Corner */}
                    <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-orange-500 z-10" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-right-2 border-orange-500 z-10" />
                    <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-orange-500 z-10" />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-right-2 border-orange-500 z-10" />

                    {/* Metadata */}
                    <div className="absolute -top-7 left-2 text-sm font-mono uppercase tracking-[0.2em] text-orange-500 flex gap-4">
                        <span>Ref: CV_{new Date().getFullYear()}_V1.0</span>
                        <span className="animate-pulse">● Live Stream</span>
                    </div>
                    <div className="absolute -bottom-6 right-2 text-sm font-mono uppercase tracking-[0.2em] text-orange-500">
                        Auth: K_BOURAKOV // ACCESS_GRANTED
                    </div>

                    <div className="bg-black/40 backdrop-blur-sm p-1 md:p-3 border border-white/10 relative overflow-hidden">
                        
                        <Document 
                            file="files/resume.pdf"
                            loading={
                                <div className="flex flex-col items-center justify-center h-[600px] w-[400px] max-w-full text-orange-500 font-mono gap-4">
                                    <div className="w-12 h-12 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin" />
                                    <span className="tracking-widest animate-pulse">SYNCHRONIZING DATA...</span>
                                </div>
                            }
                            error={
                                <div className="flex items-center justify-center h-100 text-red-500 font-mono border-2 border-red-500/50 p-8 bg-red-500/10">
                                    [ ERROR: DATA_LINK_FAILURE ]
                                </div>
                            }
                        >
                            <Page
                                pageNumber={1}
                                width={containerWidth ? Math.min(containerWidth - 64, 1000) : undefined}
                                renderTextLayer={true}
                                renderAnnotationLayer={true}
                            />
                        </Document>
                    </div>
                </div>

                <div className="relative group mb-20">
                    <a 
                        href="files/resume.pdf" 
                        download 
                        className={
                            "relative px-10 py-4 bg-black border border-orange-500 text-orange-500 font-mono font-bold flex items-center gap-3 uppercase tracking-widest " +
                            "hover:text-black hover:bg-orange-500  transition-all duration-300 " +
                            "[clip-path:polygon(15%_0,100%_0,100%_70%,85%_100%,0_100%,0_30%)]"
                        }>

                        <span className="text-xs">»</span>
                        Download_Archive
                        <span className="text-sm opacity-50 font-normal">.PDF</span>
                    </a>
                </div>
            </div>

        </BackDrop>
    );
}
