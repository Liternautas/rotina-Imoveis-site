import { useState } from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./styles.module.scss";

export function GalleryMobile() {
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
            <SwiperSlide id={styles.swiperSlide}>
                <img src="https://casacor.abril.com.br/wp-content/uploads/sites/7/2022/01/Casa-Liu-Raiz-Arquitetura-Foto-Leonardo-Giantomasi-2.jpg?quality=90&strip=info" />
            </SwiperSlide>
            <SwiperSlide id={styles.swiperSlide}>
                <img src="https://casacor.abril.com.br/wp-content/uploads/sites/7/2022/01/Casa-Liu-Raiz-Arquitetura-Foto-Leonardo-Giantomasi-2.jpg?quality=90&strip=info" />
            </SwiperSlide>
            <SwiperSlide id={styles.swiperSlide}>
                <img src="https://casacor.abril.com.br/wp-content/uploads/sites/7/2022/01/Casa-Liu-Raiz-Arquitetura-Foto-Leonardo-Giantomasi-2.jpg?quality=90&strip=info" />
            </SwiperSlide>
            <SwiperSlide id={styles.swiperSlide}>
                <img src="https://casacor.abril.com.br/wp-content/uploads/sites/7/2022/01/Casa-Liu-Raiz-Arquitetura-Foto-Leonardo-Giantomasi-2.jpg?quality=90&strip=info" />
            </SwiperSlide>
        </Swiper>
    )
}