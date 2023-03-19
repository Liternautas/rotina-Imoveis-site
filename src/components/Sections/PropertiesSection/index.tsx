import { Box } from "@mui/material";
import { Title } from "./styles";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { CardProperty } from "../../Cards/CardProperty";

import styles from './styles.module.scss';

export function PropertiesSection() {
    return (
        <Box sx={{
            py: 3
        }}>
            <Box position={'relative'}>
                <Title variant="h4">Encontre o imóvel ideal para seu estilo de vida</Title>
            </Box>
            <Swiper
                modules={[Navigation, Pagination]}
                slidesPerView={'auto'}
            >
                <SwiperSlide className={styles.swiperSlide}>
                    <CardProperty />
                </SwiperSlide>
                <SwiperSlide className={styles.swiperSlide}>
                    <CardProperty />
                </SwiperSlide>
                <SwiperSlide className={styles.swiperSlide}>
                    <CardProperty />
                </SwiperSlide>
                <SwiperSlide className={styles.swiperSlide}>
                    <CardProperty />
                </SwiperSlide>
            </Swiper>
        </Box>
    )
}