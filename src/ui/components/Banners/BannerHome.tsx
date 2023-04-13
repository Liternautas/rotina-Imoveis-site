import dynamic from "next/dynamic";
import { Container as ContainerMui, Box } from "@mui/material";
import { BackgroundHome, Container, Form, Title } from "./styles";

const FilterBanner = dynamic(() => import('../Form/FilterBanner'), {
    loading: () => null,
});

export function BannerHome() {
    return (
        <Container>
            <BackgroundHome />
            <Container sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                bgcolor: {
                    md: 'rgba(0, 0, 0, .5)',
                    xs: '#fff'
                },
                mt: 0,
                py: 8,
                px: 2
            }}>
                <Title variant="h1">
                    Sua casa dos <span>sonhos</span> está apenas a um <span>clique</span> de distância.
                </Title>
                <FilterBanner />
            </Container>
        </Container>
    )
}

export default BannerHome;