import dynamic from "next/dynamic";
import Box from "@mui/material/Box";
import { Title } from "./styles";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

import styles from './styles.module.scss';
import { useState } from "react";
import { SwiperButtons } from "../../SwiperButtons";
import { IBanner } from "@/src/interfaces";
import { getImageUrl } from "@/src/helpers/functions";

const CardRelease = dynamic(() => import('../../Cards/CardRelease'), {
    loading: () => null,
});

interface Props {
    banners: IBanner[];
}

export function ReleasesSection({ banners }: Props) {
    const [state, setState] = useState('start');

    return (
        <Box
            sx={{
                py: 3
            }}
            component={'section'}
        >
            <Box position={'relative'}>
                <Title variant="h2">Conheça os nossos lançamentos</Title>
            </Box>
            <Swiper
                modules={[Navigation, Pagination]}
                slidesPerView={'auto'}
                onSlideChange={(swiper) => {
                    { swiper.isBeginning && setState('start') }
                    { swiper.isEnd && setState('end') }
                    { !swiper.isBeginning && !swiper.isEnd && setState('progress') }
                }}
            >
                {banners.map(banner => (
                    <SwiperSlide className={styles.swiperSlide}>
                        <CardRelease image={getImageUrl(banner.path)} />
                    </SwiperSlide>
                ))}
                <SwiperButtons state={state} />
            </Swiper>
        </Box>
    )
}

export default ReleasesSection;