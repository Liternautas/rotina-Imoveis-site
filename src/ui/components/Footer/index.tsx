import { theme } from "@/styles/theme";
import { FacebookOutlined, Instagram, YouTube } from "@mui/icons-material";
import { Box, Container, Grid, IconButton, Typography } from "@mui/material";
import Link from "next/link";
import { Links, Title } from "./styles";
import Image from "next/image";

export default function Footer() {
    return (
        <>
            <Box sx={{
                background: theme.palette.secondary.main,
                py: 5
            }}>
                <Container>
                    <Grid container spacing={{ xs: 2, md: 3 }}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Title sx={{
                                fontSize: 20,
                                fontWeight: 700,
                                color: '#fff',
                                mb: 3
                            }}>Sobre</Title>
                            <Typography sx={{
                                fontSize: 14,
                                fontWeight: 400,
                                color: '#899d9d',
                                mb: 3
                            }}>
                                Estamos re-imaginando como você compra, vende e aluga. Agora é mais fácil entrar em um lugar que você ama, estamos aqui para te ajudar!
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Title sx={{
                                fontSize: 20,
                                fontWeight: 700,
                                color: '#fff',
                                mb: 3
                            }}>Acesso rápido</Title>
                            <Links>
                                <Link href={"/sobre"}>Sobre nós</Link>
                                <Link href={""}>Serviços que oferecemos</Link>
                                <Link href={"/imoveis/filter?adType=venda"}>Imóveis disponíveis</Link>
                                <Link href={"/contato"}>Entre em contato</Link>
                                <Link href={"/politica-privacidade"}>Política de Privacidade</Link>
                            </Links>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Title sx={{
                                fontSize: 20,
                                fontWeight: 700,
                                color: '#fff',
                                mb: 3
                            }}>Contate-nos</Title>
                            <Links>
                                <Link href={"/"}>contato@rotinaimoveis.com.br</Link>
                                <a href={"/https://goo.gl/maps/z1NHCSDmBj6L68zbA"} target="_blank">Avenida. Cristiano Aires, 110 - Centro, Catalão - GO, 75701-380</a>
                                <Link href={"/"}>(64) 98423-0113</Link>
                            </Links>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Title sx={{
                                fontSize: 20,
                                fontWeight: 700,
                                color: '#fff',
                                mb: 3
                            }}>Siga-nos</Title>
                            <Links>
                                <Box sx={{
                                    display: "flex",
                                    gap: 1
                                }}>
                                    <Link href={'https://www.facebook.com/rotinaimoveis'} target="_blank">
                                        <IconButton>
                                            <FacebookOutlined />
                                        </IconButton>
                                    </Link>
                                    <Link href={'https://www.instagram.com/rotinaimoveiscatalao/'} target="_blank">
                                        <IconButton>
                                            <Instagram />
                                        </IconButton>
                                    </Link>
                                </Box>
                            </Links>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Box sx={{
                background: '#222',
            }}>
                <Container sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: {
                        md: "space-between",
                        xs: "center"
                    },
                    gap: 1,
                    padding: 2
                }}>
                    <Typography sx={{
                        color: "#fff",
                        fontSize: 14,
                        textAlign: 'center',
                    }}>©2022 Rotina Imóveis - CRECI: CJ-8015 - Todos os direitos reservados.</Typography>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1
                    }}>
                        <Typography sx={{
                            color: "#fff",
                            fontSize: 14,
                            textAlign: 'center',
                        }}>
                            Desenvolvido por:
                        </Typography>
                        <a href="https://zeyah-front.vercel.app/" target="_blank" style={{ display: 'flex' }}>
                            <Image width={66} height={24} src={'https://zeyah-front.vercel.app/_next/static/media/logo.eff34789.svg'} alt="zeyah" />
                        </a>
                    </Box>
                </Container>
            </Box>
        </>
    )
}