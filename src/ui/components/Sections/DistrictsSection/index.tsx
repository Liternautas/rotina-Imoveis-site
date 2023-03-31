import Box from "@mui/material/Box";
import { Title } from "./styles";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { CardDistrict } from "../../Cards/CardDistrict";

import styles from './styles.module.scss';
import { useState } from "react";
import { SwiperButtons } from "../../SwiperButtons";

export function DistrictsSection() {
    const [state, setState] = useState('start');

    return (
        <Box sx={{
            py: 3
        }}>
            <Box position={'relative'}>
                <Title variant="h4">Explore por bairros mais populares</Title>
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
                    <CardDistrict image="/image05.png" subtitle="" title="" />
                </SwiperSlide>
                <SwiperSlide className={styles.swiperSlide}>
                    <CardDistrict image="/image06.png" subtitle="" title="" />
                </SwiperSlide>
                <SwiperSlide className={styles.swiperSlide}>
                    <CardDistrict image="/image07.png" subtitle="" title="" />
                </SwiperSlide>
                <SwiperSlide className={styles.swiperSlide}>
                    <CardDistrict image="/image08.png" subtitle="" title="" />
                </SwiperSlide>
                <SwiperButtons state={state}/>
            </Swiper>
        </Box>
    )
}