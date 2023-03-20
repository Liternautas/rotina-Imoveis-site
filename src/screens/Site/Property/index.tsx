import { Gallery } from "@/src/components/Gallery";
import { PropertiesSection } from "@/src/components/Sections/PropertiesSection";
import { characteristics, extras, furniture, security } from "@/src/utils/data";
import { FavoriteBorderOutlined, ReportOutlined, ShareOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, Container, Divider, Grid, Typography } from "@mui/material";
import { Aside, Description, Subtitle, Title } from "./styles";

export function Property() {
    return (
        <Box sx={{
            mt: '64px',
            pt: 3,
            minHeight: '100vh',
            background: `#fafafa`
        }}>
            <Container>
                <Grid container spacing={{ md: 3 }} sx={{ mb: 6 }}>
                    <Grid item md={8}>
                        <Title>Casa à venda no Loteamento Ipanema</Title>
                        <Subtitle>Catalão, Goiás</Subtitle>
                        <Gallery />
                        <Description>Vendo excelente casa com jardim e enorme área para seu pet, 3 quartos, sendo um com suite, 3 banheiros em toda a casa, enorme área de lazer, cozinha fora de casa, garagem para dois carros, todas as janelas que ficam de frente para o sol tem uma tenda para proteger, um quarto para dispensa, mando todas as fotos da casa em particular.</Description>
                        <Box sx={{
                            display: 'flex',
                            gap: 1
                        }}>
                            <Button variant="outlined" sx={{ display: "flex", gap: 1 }}><FavoriteBorderOutlined /> Favoritar</Button>
                            <Button variant="outlined" sx={{ display: "flex", gap: 1 }}><ShareOutlined /> Compartilhar</Button>
                        </Box>
                        <Divider sx={{
                            mt: 4
                        }}/>
                        <Box sx={{
                            mt: 4
                        }}>
                            <Subtitle sx={{mb: 1, fontSize: 18}}>Detalhes</Subtitle>
                            <Grid container spacing={{md: 1}}>
                                <Grid item md={4}>3 quartos</Grid>
                                <Grid item md={4}>1 suíte</Grid>
                                <Grid item md={4}>2 banheiros</Grid>
                                <Grid item md={4}>2 garagens</Grid>
                                <Grid item md={4}>140m² de área útil</Grid>
                                <Grid item md={4}>190m² de área total</Grid>
                            </Grid>
                        </Box>
                        <Divider sx={{
                            mt: 4
                        }}/>
                        <Box sx={{
                            mt: 4
                        }}>
                            <Subtitle sx={{mb: 1, fontSize: 18}}>Caracteristicas</Subtitle>
                            <Grid container spacing={{md: 1}}>
                                {characteristics.map(item => (
                                    <Grid item md={4}>{item.name}</Grid>
                                ))}
                            </Grid>
                        </Box>
                        <Divider sx={{
                            mt: 4
                        }}/>
                        <Box sx={{
                            mt: 4
                        }}>
                            <Subtitle sx={{mb: 1, fontSize: 18}}>Segurança</Subtitle>
                            <Grid container spacing={{md: 1}}>
                                {security.map(item => (
                                    <Grid item md={4}>{item.name}</Grid>
                                ))}
                            </Grid>
                        </Box>
                        <Divider sx={{
                            mt: 4
                        }}/>
                        <Box sx={{
                            mt: 4
                        }}>
                            <Subtitle sx={{mb: 1, fontSize: 18}}>Mobilia</Subtitle>
                            <Grid container spacing={{md: 1}}>
                                {furniture.map(item => (
                                    <Grid item md={4}>{item.name}</Grid>
                                ))}
                            </Grid>
                        </Box>
                        <Divider sx={{
                            mt: 4
                        }}/>
                        <Box sx={{
                            mt: 4
                        }}>
                            <Subtitle sx={{mb: 1, fontSize: 18}}>Extras</Subtitle>
                            <Grid container spacing={{md: 1}}>
                                {extras.map(item => (
                                    <Grid item md={4}>{item.name}</Grid>
                                ))}
                            </Grid>
                        </Box>
                        <Divider sx={{
                            mt: 4
                        }}/>
                    </Grid>
                    <Grid item md={4}>
                        <Aside>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: 1
                                }}>
                                    <Typography>Venda:</Typography>
                                    <Typography>R$ 500.000,00</Typography>
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: 1
                                }}>
                                    <Typography>Condomínio:</Typography>
                                    <Typography>R$ 300,00</Typography>
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: 1
                                }}>
                                    <Typography>IPTU:</Typography>
                                    <Typography>R$ 200,00</Typography>
                                </Box>
                                <Divider />
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: 1
                                }}>
                                    <Typography>Total:</Typography>
                                    <Typography sx={{
                                        fontSize: 18,
                                        fontWeight: 600
                                    }}>R$ 500.500,00</Typography>
                                </Box>
                            </Box>
                            <Box sx={{
                                display: "flex",
                                gap: 1,
                                mt: 2
                            }}>
                                <Avatar>E</Avatar>
                                <Box>
                                    <Typography>Ezequiel Pires e Silva</Typography>
                                    <Typography sx={{
                                        fontSize: 14
                                    }}>ezequiel.pires082000@gmail.com</Typography>
                                    <Button sx={{
                                        p: 0
                                    }}>Veja mais imóveis desse corretor</Button>
                                </Box>
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1.5,
                                mt: 2
                            }}>
                                <Button variant="contained" fullWidth sx={{
                                    color: '#fff',
                                    height: 48
                                }}>Entrar em contato</Button>
                                <Button variant="outlined" fullWidth sx={{
                                    height: 48
                                }}>Simular financiamento</Button>
                            </Box>
                        </Aside>
                    </Grid>
                </Grid>
                <PropertiesSection />
            </Container>
        </Box>
    )
}