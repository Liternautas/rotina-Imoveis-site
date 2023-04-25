import dynamic from "next/dynamic";
import Box from "@mui/material/Box";
import { Subtitle, Title } from "./styles";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

const CardProperty = dynamic(() => import('../../Cards/CardProperty'), {
    loading: () => null,
});

import styles from './styles.module.scss';
import { SwiperButtons } from "../../SwiperButtons";
import { useState } from "react";
import { IProperty } from "@/src/interfaces";

interface Props {
    properties: IProperty[];
    title?: string;
    subtitle?: string;
}

export function PropertiesSection({ properties, subtitle, title }: Props) {
    const [state, setState] = useState('start');

    return (
        <Box
            sx={{
                py: 3
            }}
            component={'section'}
        >
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <Title variant="h2">{title ?? 'Imóveis em Destaque'}</Title>
                <Subtitle variant="subtitle1">{subtitle ?? 'Descubra as melhores propriedades para venda ou aluguel'}</Subtitle>
            </Box>
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
                {properties.map(property =>
                    <SwiperSlide className={styles.swiperSlide}>
                        <CardProperty property={property} />
                    </SwiperSlide>
                )}
                <SwiperButtons state={state} />
            </Swiper>
        </Box>
    )
}

export default PropertiesSection;