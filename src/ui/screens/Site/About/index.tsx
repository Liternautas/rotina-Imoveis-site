import { Box, Container, Typography } from "@mui/material";
import { Section, Title } from "./styles";

export function About() {
    return (
        <Container sx={{
            mt: '64px',
            py: 6,
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            gap: 8
        }}>
            <Section component={'section'}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    minWidth: 300
                }}>
                    <Title variant="h2">Sobre a Rotina Imóveis</Title>
                    <Typography variant="subtitle1" component={'p'}>A Rotina Imóveis é uma empresa do setor imobiliário que atua na cidade de Catalão, Goiás. Fundada em [ano de fundação], a empresa tem como missão oferecer serviços de qualidade e soluções eficientes para seus clientes, sempre buscando a satisfação dos mesmos através de um atendimento personalizado e transparente.</Typography>
                </Box>
                <img src="/about-01.png" />
            </Section>
            <Section component={'section'} sx={{flexWrap: 'wrap-reverse'}}>
                <img src="/about-02.png" />
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    flex: 1,
                    minWidth: 300
                }}>
                    <Title variant="h2">Nossa missão</Title>
                    <Typography variant="subtitle1" textAlign={{
                        md: 'end',
                        sx: 'start'
                    }} component={'p'}>Com um portfólio diversificado e uma reputação consolidada, a Rotina Imóveis tem como objetivo principal ser a melhor escolha para quem busca serviços imobiliários de qualidade em Catalão e região. A empresa acredita que a satisfação e o sucesso de seus clientes são os pilares para seu crescimento e desenvolvimento, e por isso se dedica diariamente a oferecer um atendimento de excelência e soluções eficientes para seus clientes.</Typography>
                </Box>
            </Section>
            <Section component={'section'}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    minWidth: 300
                }}>
                    <Title variant="h2">Nossos valores</Title>
                    <Typography variant="subtitle1" component={'p'}>A empresa preza por valores como ética, transparência e honestidade, mantendo sempre uma postura profissional e respeitosa com seus clientes e parceiros. Além disso, a Rotina Imóveis valoriza a competência, a eficiência e a inovação, buscando sempre estar atualizada com as novas tendências do mercado imobiliário e oferecer soluções criativas e diferenciadas para seus clientes.</Typography>
                </Box>
                <img src="/about-03.png" />
            </Section>
            <Section component={'section'} sx={{flexWrap: 'wrap-reverse'}}>
                <img src="/about-04.png" />
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    flex: 1,
                    minWidth: 300
                }}>
                    <Title variant="h2">Nossa visão</Title>
                    <Typography variant="subtitle1" component={'p'} textAlign={{
                        md: 'end',
                        sx: 'start'
                    }}>A visão da Rotina Imóveis é ser reconhecida como uma empresa referência no mercado imobiliário de Catalão, Goiás, oferecendo sempre as melhores soluções para seus clientes e mantendo um relacionamento duradouro com os mesmos. Para isso, a empresa investe constantemente em sua equipe e em tecnologias avançadas, visando sempre aprimorar seus serviços e atender cada vez melhor às necessidades de seus clientes.</Typography>
                </Box>
            </Section>
        </Container>
    )
}