import {useEffect, useState} from "react";
import BackDrop from "./BackDrop.tsx";

export default function Experience({ unzoom }: { unzoom: () => void }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 500);
        return () => {
            clearTimeout(timer);
        };
    }, []);

    function zoomOut() {
        setVisible(false)
        unzoom()
    }

    return (
        <BackDrop visible={visible} zoomOut={zoomOut} title={"Experience"} flip={true}>
            <p>Here</p>
        </BackDrop>
    )
}