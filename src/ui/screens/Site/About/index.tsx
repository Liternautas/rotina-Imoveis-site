import { Box, Container, Typography } from "@mui/material";
import { Title } from "./styles";

export function About() {
    return (
        <Container sx={{
            mt: '64px',
            py: {
                sx: 0,
                md: 6
            },
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            gap: 8
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <Title>Sobre a Rotina Imóveis</Title>
                    <Typography>A Rotina Imóveis é uma empresa do setor imobiliário que atua na cidade de Catalão, Goiás. Fundada em [ano de fundação], a empresa tem como missão oferecer serviços de qualidade e soluções eficientes para seus clientes, sempre buscando a satisfação dos mesmos através de um atendimento personalizado e transparente.</Typography>
                </Box>
                <img src="/about-01.png" />
            </Box>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2
            }}>
                <img src="/about-02.png" />
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end'
                }}>
                    <Title>Nossa missão</Title>
                    <Typography textAlign={'end'}>Com um portfólio diversificado e uma reputação consolidada, a Rotina Imóveis tem como objetivo principal ser a melhor escolha para quem busca serviços imobiliários de qualidade em Catalão e região. A empresa acredita que a satisfação e o sucesso de seus clientes são os pilares para seu crescimento e desenvolvimento, e por isso se dedica diariamente a oferecer um atendimento de excelência e soluções eficientes para seus clientes.</Typography>
                </Box>
            </Box>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <Title>Nossos valores</Title>
                    <Typography>A empresa preza por valores como ética, transparência e honestidade, mantendo sempre uma postura profissional e respeitosa com seus clientes e parceiros. Além disso, a Rotina Imóveis valoriza a competência, a eficiência e a inovação, buscando sempre estar atualizada com as novas tendências do mercado imobiliário e oferecer soluções criativas e diferenciadas para seus clientes.</Typography>
                </Box>
                <img src="/about-03.png" />
            </Box>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2
            }}>
                <img src="/about-04.png" />
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end'
                }}>
                    <Title>Nossa visão</Title>
                    <Typography textAlign={'end'}>A visão da Rotina Imóveis é ser reconhecida como uma empresa referência no mercado imobiliário de Catalão, Goiás, oferecendo sempre as melhores soluções para seus clientes e mantendo um relacionamento duradouro com os mesmos. Para isso, a empresa investe constantemente em sua equipe e em tecnologias avançadas, visando sempre aprimorar seus serviços e atender cada vez melhor às necessidades de seus clientes.</Typography>
                </Box>
            </Box>
        </Container>
    )
}