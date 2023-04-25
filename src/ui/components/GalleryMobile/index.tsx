import { useState } from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./styles.module.scss";
import { getImageUrl } from "@/src/helpers/functions";

export function GalleryMobile({ images }) {
    const [state, setState] = useState<'start' | 'end' | 'progress'>('start');
    return (
        <Swiper
            id={styles.swiper}
            modules={[Navigation, Pagination]}
            slidesPerView={'auto'}
            onSlideChange={(swiper) => {
                { swiper.isBeginning && setState('start') }
                { swiper.isEnd && setState('end') }
                { !swiper.isBeginning && !swiper.isEnd && setState('progress') }
            }}
        >
            {images?.map(image => <SwiperSlide id={styles.swiperSlide}>
                <img src={getImageUrl(image)} alt="Image View"/>
            </SwiperSlide>)}
        </Swiper>
    )
}