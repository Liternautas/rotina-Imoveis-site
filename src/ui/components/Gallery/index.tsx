import { getImageUrl } from "@/src/helpers/functions";
import { Add, CollectionsOutlined } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { GalleryView } from "../GalleryView";
import { ButtonPlus, GalleryContainer, ImageSelected, Thumb, Thumbns } from "./styles";

export function Gallery({ images }) {
    const ref = useRef(null);
    const [heigth, setHeight] = useState(290);
    const [image, setImage] = useState(null);
    const [showGalleryView, setShowGalleryView] = useState(false);

    useEffect(() => {
        if (ref.current) {
            const width = ref.current.clientWidth;
            setHeight(width * .5);
        }
    }, [ref.current]);

    useEffect(() => {
        { images && setImage(images[0]) };
    }, [images]);

    return (
        <GalleryContainer ref={ref} sx={{
            height: heigth,
            display: {
                xs: 'none',
                md: 'flex'
            }
        }}>
            {showGalleryView && <GalleryView images={images} active={0} close={() => setShowGalleryView(false)} show={showGalleryView} />}
            <ImageSelected onMouseDown={() => setShowGalleryView(true)}>
                <img src={getImageUrl(image)} />
            </ImageSelected>
            <Thumbns>
                {images.map((image, index) => {
                    if (index < 3) {
                        return <Thumb onMouseDown={() => setImage(image)}>
                            <img src={getImageUrl(image)} />
                        </Thumb>
                    }
                    if(index === 3 || (index < 3 && (index === images.length - 1))) {
                        return <Thumb onMouseDown={() => setShowGalleryView(true)}>
                            <ButtonPlus>
                                <CollectionsOutlined />
                            </ButtonPlus>
                            <img src={getImageUrl(image)} />
                        </Thumb>
                    }
                }
                )}
            </Thumbns>
        </GalleryContainer>
    )
}