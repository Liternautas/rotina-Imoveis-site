import { useState, useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import { Keyboard, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Container, ButtonClose } from "./styles";
import styles from "./styles.module.scss";
import { Slide } from "./components/Slide";
import { PrevButton } from "./components/PrevButton";
import { NextButton } from "./components/NextButton";
import { HandleIndex } from "./components/HandleIndex";
import { Close } from "@mui/icons-material";
import { Container as ContainerMui } from "@mui/material";

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
                >
                    <HandleIndex active={active} show={show} />
                    {images.map((item, index) => (
                        <SwiperSlide key={index} id={styles.swiper_slide}>
                            <Slide image={item} />
                        </SwiperSlide>
                    ))}
                    <PrevButton disabled={state === 'start' && true} />
                    <NextButton disabled={state === 'end' || images.length < 2 ? true : false} />
                </Swiper>
            </ContainerMui>
        </Container>
    )
}