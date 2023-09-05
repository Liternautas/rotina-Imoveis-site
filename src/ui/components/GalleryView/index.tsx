import { useState, useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import { Keyboard, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Container, ButtonClose } from "./styles";
import styles from "./styles.module.scss";
import { PrevButton } from "./components/PrevButton";
import { NextButton } from "./components/NextButton";
import { Close } from "@mui/icons-material";
import { Container as ContainerMui } from "@mui/material";
import { getImageUrl } from "@/src/helpers/functions";

export function GalleryView({ close, active, show, images }) {
    const [state, setState] = useState('start');
    const GlobalStyle = createGlobalStyle`
        html {
            overflow-y: hidden !important;
        }
    `

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                close();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <Container style={{
            visibility: !show ? 'hidden' : 'visible'
        }}>
            {show && <GlobalStyle />}
            <ButtonClose onClick={close}><Close /></ButtonClose>
            <ContainerMui style={{position: 'relative'}}>
                <Swiper
                    keyboard
                    id={styles.swiper}
                    pagination={{
                        type: "fraction",
                    }}
                    modules={[Pagination, Navigation, Keyboard]}
                    onSlideChange={(swiper) => {
                        { swiper.isBeginning && setState('start') }
                        { swiper.isEnd && setState('end') }
                        { !swiper.isBeginning && !swiper.isEnd && setState('progress') }
                    }}
                    initialSlide={active}
                >
                    {images.map((item, index) => (
                        <SwiperSlide key={index} id={styles.swiper_slide}>
                            <img src={getImageUrl(item)} />
                        </SwiperSlide>
                    ))}
                    <PrevButton disabled={state === 'start' && true} />
                    <NextButton disabled={state === 'end' || images.length < 2 ? true : false} />
                </Swiper>
            </ContainerMui>
        </Container>
    )
}