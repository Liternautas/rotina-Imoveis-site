import dynamic from "next/dynamic";
import { BackgroundHome, Container, Form, Title } from "./styles";

const FilterBanner = dynamic(() => import('../Form/FilterBanner'), {
    loading: () => null,
});

export function BannerHome() {
    return (
        <Container sx={{
            borderRadius: 2,
        }}>
            <Title variant="h1">
                Sua casa dos <span>sonhos</span> está apenas a um <span>clique</span> de distância.
            </Title>
            <FilterBanner />
            <BackgroundHome />
        </Container>
    )
}

export default BannerHome;