import dynamic from "next/dynamic";
import { Box } from "@mui/material";
import { Container } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

import styles from './styles.module.scss';
import { Subtitle, Title } from "./styles";
import BannerHome from "@/src/ui/components/Banners/BannerHome";

const PropertiesSection = dynamic(() => import('@/src/ui/components/Sections/PropertiesSection'), {
    loading: () => null,
});

const DistrictsSection = dynamic(() => import('@/src/ui/components/Sections/DistrictsSection'), {
    loading: () => null,
});

const CollaboratorsSection = dynamic(() => import('@/src/ui/components/Sections/CollaboratorsSection'), {
    loading: () => null,
});

const ReleasesSection = dynamic(() => import('@/src/ui/components/Sections/ReleasesSection'), {
    loading: () => null,
});

const CardInfo = dynamic(() => import('@/src/ui/components/Cards/CardInfo'), {
    loading: () => null,
});

export function Home({ properties, banners, realtors }) {
    return (
        <Box sx={{
            mt: '72px',
        }}
            component={'section'}>
            <BannerHome />
            <Container>
                <PropertiesSection properties={properties} />
                <ReleasesSection banners={banners} />
                <PropertiesSection 
                title="Imóveis recém-chegados" 
                subtitle="Descubra nossas últimas adições em imóveis, prontas para se tornarem seu novo lar."
                properties={properties} 
                />
                <Box sx={{
                    py: 3
                }}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}>
                        <Title variant="h2">Encontre seu Imóvel Ideal</Title>
                        <Subtitle variant="subtitle1">Descubra a propriedade perfeita para o seu estilo de vida</Subtitle>
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
                <CollaboratorsSection realtors={realtors}/>
            </Container>
        </Box>
    )
}