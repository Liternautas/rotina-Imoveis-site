import dynamic from "next/dynamic";
import Box from "@mui/material/Box";
import { Title } from "./styles";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

import styles from './styles.module.scss';
import { useState } from "react";
import { SwiperButtons } from "../../SwiperButtons";

const CardRelease = dynamic(() => import('../../Cards/CardRelease'), {
    loading: () => <p>Loading...</p>,
});

export function ReleasesSection() {
    const [state, setState] = useState('start');

    return (
        <Box sx={{
            py: 3
        }}>
            <Box position={'relative'}>
                <Title variant="h4">Conheça os nossos lançamentos</Title>
            </Box>
            <Swiper
                modules={[Navigation, Pagination]}
                slidesPerView={'auto'}
                onSlideChange={(swiper) => {
                    {swiper.isBeginning && setState('start')}
                    {swiper.isEnd && setState('end')}
                    {!swiper.isBeginning && !swiper.isEnd && setState('progress')}
                }}
            >
                <SwiperSlide className={styles.swiperSlide}>
                    <CardRelease image="/release.png" />
                </SwiperSlide>
                <SwiperSlide className={styles.swiperSlide}>
                    <CardRelease image="/release.png" />
                </SwiperSlide>
                <SwiperSlide className={styles.swiperSlide}>
                    <CardRelease image="/release.png"  />
                </SwiperSlide>
                <SwiperSlide className={styles.swiperSlide}>
                    <CardRelease image="/release.png" />
                </SwiperSlide>
                <SwiperButtons state={state}/>
            </Swiper>
        </Box>
    )
}

export default ReleasesSection;