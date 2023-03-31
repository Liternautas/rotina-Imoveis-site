import { useRef, useEffect, useState } from "react";
import { getImageUrl } from "@/src/helpers/functions"; 
import { Container } from "./styles";

export function Slide({ image }) {
    const ref = useRef(null);
    const [height, setHeight] = useState<string | number>('auto');
    useEffect(() => {
        const width = ref.current.offsetWidth;
        setHeight(width * 0.6);
    }, []);

    return (
        <Container ref={ref}>
            <img src={getImageUrl(image)} />
        </Container>
    )
}