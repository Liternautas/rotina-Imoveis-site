import { useEffect, useRef, useState } from "react";
import { GalleryContainer, ImageSelected, Thumb, Thumbns } from "./styles";

export function Gallery() {
    const ref = useRef(null);
    const [heigth, setHeight] = useState(290);

    useEffect(() => {
        if (ref.current) {
            const width = ref.current.clientWidth;
            setHeight(width * .5);
        }
    }, [ref.current]);

    return (
        <GalleryContainer ref={ref} style={{
            height: heigth
        }}>
            <ImageSelected>
                <img src="https://casacor.abril.com.br/wp-content/uploads/sites/7/2022/01/Casa-Liu-Raiz-Arquitetura-Foto-Leonardo-Giantomasi-2.jpg?quality=90&strip=info" />
            </ImageSelected>
            <Thumbns>
                <Thumb>
                    <img src="https://casacor.abril.com.br/wp-content/uploads/sites/7/2022/01/Casa-Liu-Raiz-Arquitetura-Foto-Leonardo-Giantomasi-2.jpg?quality=90&strip=info" />
                </Thumb>
                <Thumb>
                    <img src="https://casacor.abril.com.br/wp-content/uploads/sites/7/2022/01/Casa-Liu-Raiz-Arquitetura-Foto-Leonardo-Giantomasi-2.jpg?quality=90&strip=info" />
                </Thumb>
                <Thumb>
                    <img src="https://casacor.abril.com.br/wp-content/uploads/sites/7/2022/01/Casa-Liu-Raiz-Arquitetura-Foto-Leonardo-Giantomasi-2.jpg?quality=90&strip=info" />
                </Thumb>
                <Thumb>
                    <img src="https://casacor.abril.com.br/wp-content/uploads/sites/7/2022/01/Casa-Liu-Raiz-Arquitetura-Foto-Leonardo-Giantomasi-2.jpg?quality=90&strip=info" />
                </Thumb>
            </Thumbns>
        </GalleryContainer>
    )
}