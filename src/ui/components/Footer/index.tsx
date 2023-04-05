import { theme } from "@/styles/theme";
import { FacebookOutlined, Instagram, YouTube } from "@mui/icons-material";
import { Box, Container, Grid, IconButton, Typography } from "@mui/material";
import Link from "next/link";
import { Links, Title } from "./styles";

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
                                <Link href={"/"}>Av. José Maria Viêira, 560 - Santa Helena II, Catalão - GO</Link>
                                <Link href={"/"}>(64) 0000-0000</Link>
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
                                    <IconButton>
                                        <FacebookOutlined />
                                    </IconButton>
                                    <IconButton>
                                        <Instagram />
                                    </IconButton>
                                    <IconButton>
                                        <YouTube />
                                    </IconButton>
                                </Box>
                            </Links>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Box sx={{
                background: '#222',
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 2
            }}>
                <Typography sx={{
                    color: "#fff",
                    fontSize: 14,
                    textAlign: 'center',
                }}>©2022 Rotina Imóveis - CRECI: 000000 - Todos os direitos reservados.</Typography>
            </Box>
        </>
    )
}