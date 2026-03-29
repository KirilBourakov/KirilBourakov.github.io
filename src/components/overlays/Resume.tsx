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

export default function Resume({ unzoom }: { unzoom?: () => void }) {
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
        setVisible(false);
        if (unzoom) {
            setTimeout(unzoom, 500); // Wait for fade out
        }
    }

    return (
        <BackDrop visible={visible} zoomOut={zoomOut} title={"Resume"}>

            <div className="flex flex-col items-center p-4 md:p-8 gap-8" ref={containerRef}>
                <div className="bg-white/5 p-2 rounded-lg max-w-full">
                    <Document 
                        file="files/resume.pdf"
                        loading={
                            <div className="flex items-center justify-center h-100 w-full text-orange-500 font-mono">
                                Loading Data Stream...
                            </div>
                        }
                        error={
                            <div className="flex items-center justify-center h-100 text-red-500 font-mono">
                                Error: Unable to retrieve document.
                            </div>
                        }
                    >
                        <Page
                            pageNumber={1}
                            width={containerWidth ? Math.min(containerWidth - 64, 1000) : undefined}
                            renderTextLayer={true}
                            renderAnnotationLayer={true}
                            className="shadow-2xl"
                        />
                    </Document>
                </div>

                <a 
                    href="files/resume.pdf" 
                    download 
                    className="mb-20 px-8 py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded transition-colors flex items-center gap-2 uppercase tracking-tighter"
                >
                    Download PDF
                </a>
            </div>

        </BackDrop>
    );
}
