import { BannerHome } from "@/src/components/Banners/BannerHome";
import { CardInfo } from "@/src/components/Cards/CardInfo";
import { Box, Container } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

import styles from './styles.module.scss';
import { Title } from "./styles";
import { PropertiesSection } from "@/src/components/Sections/PropertiesSection";

export function Home() {
    return (
        <Box sx={{
            mt: '64px',
            pt: 2,
        }}>
            <BannerHome />
            <Container>
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
                            <CardInfo
                                image="/image01.png"
                                title="Mais espaço para fámilia"
                                subtitle="Se você está procurando por varanda e áreas comuns, confira essa seleção de apartamentos e casas à venda que oferecem exatamente o que você deseja."
                            />
                        </SwiperSlide>
                        <SwiperSlide className={styles.swiperSlide}>
                            <CardInfo
                                image="/image02.png"
                                title="Pronto para seu pet"
                                subtitle="Encontre as melhores ofertas de aluguel de imóveis que aceitam seu pet, para que você e seu patudo possam desfrutar juntos."
                            />
                        </SwiperSlide>
                        <SwiperSlide className={styles.swiperSlide}>
                            <CardInfo
                                image="/image03.png"
                                title="Mobiliados para locação"
                                subtitle="Se você não quer gastar com móveis agora, confira nossa seleção dos melhores imóveis mobiliados para alugar. Estão prontos para você entrar e morar imediatamente."
                            />
                        </SwiperSlide>
                        <SwiperSlide className={styles.swiperSlide} style={{ marginRight: '0 !important' }}>
                            <CardInfo
                                image="/image04.png"
                                title="Aluguel sem fiador"
                                subtitle="Encontrar o imóvel dos seus sonhos nunca foi tão fácil! Confira nossa seleção dos melhores imóveis disponíveis para aluguel."
                            />
                        </SwiperSlide>
                    </Swiper>
                </Box>

                <PropertiesSection />
            </Container>
        </Box>
    )
}