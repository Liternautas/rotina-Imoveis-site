import { maskPrice } from "@/src/helpers/mask";
import { IProperty } from "@/src/interfaces";
import { Gallery } from "@/src/ui/components/Gallery";
import { GalleryMobile } from "@/src/ui/components/GalleryMobile";
import { PropertiesSection } from "@/src/ui/components/Sections/PropertiesSection";
import { FavoriteBorderOutlined, ShareOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, Container, Divider, Grid, Typography } from "@mui/material";
import { Aside, Description, Footer, Subtitle, Title } from "./styles";
import { ModalScheduling } from '@/src/ui/components/modals/ModalScheduling';
import { ModalContact } from '@/src/ui/components/modals/ModalContact';

interface Props {
    property: IProperty;
    properties: IProperty[];
}

export function Property({properties, property}: Props) {
    const {type, adType, address, code, numberBathroom, numberGarage, numberRooms, numberSuite, description, details, condominium, exemptIptu, favorites, id, images, iptu, owner, pickup, price, totalArea, usefulArea} = property;
    const characteristics = details.filter(detail => detail.type === 'characteristics');
    const furniture = details.filter(detail => detail.type === 'furniture');
    const security = details.filter(detail => detail.type === 'security');
    const extras = details.filter(detail => detail.type === 'extras');
    const priceFinal = Number(condominium) + Number(price) + Number(iptu);

    if(!property) {
        return <div style={{height: '60vh'}}></div>;
    }
    return (
        <Box sx={{
            mt: '64px',
            pt: {
                sx: 0,
                md: 3
            },
            minHeight: '100vh',
            background: `#fafafa`
        }}>
            <GalleryMobile />
            <Container>
                <Grid container spacing={{ md: 3 }} sx={{ mb: 6 }}>
                    <Grid item md={8}>
                        <Title>{type.name} {adType === 'aluguel' ? `para alugar` : `à venda`} {address.district && `no ${address.district.name}`}</Title>
                        <Subtitle>{address.city.name}, {address.state.name}</Subtitle>
                        <Gallery images={images}/>
                        <Description>{description}</Description>
                        <Box sx={{
                            display: 'flex',
                            gap: 1
                        }}>
                            <Button variant="outlined" sx={{ display: "flex", gap: 1 }}><FavoriteBorderOutlined /> Favoritar</Button>
                            <Button variant="outlined" sx={{ display: "flex", gap: 1 }}><ShareOutlined /> Compartilhar</Button>
                        </Box>
                        <Divider sx={{
                            mt: 4
                        }} />
                        <Box sx={{
                            mt: 4
                        }}>
                            <Subtitle sx={{ mb: 1, fontSize: 18 }}>Detalhes</Subtitle>
                            <Grid container spacing={{ md: 1 }}>
                                <Grid item xs={6} md={4}>{numberRooms} quartos</Grid>
                                <Grid item xs={6} md={4}>{numberSuite} suíte</Grid>
                                <Grid item xs={6} md={4}>{numberBathroom} banheiros</Grid>
                                <Grid item xs={6} md={4}>{numberGarage} garagens</Grid>
                                <Grid item xs={6} md={4}>{usefulArea}m² de área útil</Grid>
                                <Grid item xs={6} md={4}>{totalArea}m² de área total</Grid>
                            </Grid>
                        </Box>
                        <Divider sx={{
                            mt: 4
                        }} />
                        <Box sx={{
                            mt: 4
                        }}>
                            <Subtitle sx={{ mb: 1, fontSize: 18 }}>Caracteristicas</Subtitle>
                            <Grid container spacing={{ md: 1, xs: 2 }}>
                                {characteristics.map(item => (
                                    <Grid item xs={6} md={4}>{item.name}</Grid>
                                ))}
                            </Grid>
                        </Box>
                        <Divider sx={{
                            mt: 4
                        }} />
                        <Box sx={{
                            mt: 4
                        }}>
                            <Subtitle sx={{ mb: 1, fontSize: 18 }}>Segurança</Subtitle>
                            <Grid container spacing={{ md: 1, xs: 2 }}>
                                {security.map(item => (
                                    <Grid item xs={6} md={4}>{item.name}</Grid>
                                ))}
                            </Grid>
                        </Box>
                        <Divider sx={{
                            mt: 4
                        }} />
                        <Box sx={{
                            mt: 4
                        }}>
                            <Subtitle sx={{ mb: 1, fontSize: 18 }}>Mobilia</Subtitle>
                            <Grid container spacing={{ md: 1, xs: 2 }}>
                                {furniture.map(item => (
                                    <Grid item xs={6} md={4}>{item.name}</Grid>
                                ))}
                            </Grid>
                        </Box>
                        <Divider sx={{
                            mt: 4
                        }} />
                        <Box sx={{
                            mt: 4
                        }}>
                            <Subtitle sx={{ mb: 1, fontSize: 18 }}>Extras</Subtitle>
                            <Grid container spacing={{ md: 1, xs: 2 }}>
                                {extras.map(item => (
                                    <Grid item xs={6} md={4}>{item.name}</Grid>
                                ))}
                            </Grid>
                        </Box>
                        <Divider sx={{
                            mt: 4
                        }} />
                    </Grid>
                    <Grid item md={4} sx={{
                        display: {
                            xs: 'none',
                            md: 'flex'
                        }
                    }}>
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
                                    <Typography>R$ {maskPrice(price)}</Typography>
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: 1
                                }}>
                                    <Typography>Condomínio:</Typography>
                                    <Typography>R$ {maskPrice(condominium)}</Typography>
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: 1
                                }}>
                                    <Typography>IPTU:</Typography>
                                    <Typography>R$ {maskPrice(iptu)}</Typography>
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
                                    }}>R$ {maskPrice(priceFinal.toString())}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{
                                display: "flex",
                                gap: 1,
                                mt: 2
                            }}>
                                <Avatar>{pickup.name.substring(0, 1)}</Avatar>
                                <Box>
                                    <Typography>{pickup.name}</Typography>
                                    <Typography sx={{
                                        fontSize: 14
                                    }}>{pickup.email}</Typography>
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
                                <ModalContact />
                                <ModalScheduling />
                                {/* <Button variant="outlined" fullWidth sx={{
                                    height: 48
                                }}>Simular financiamento</Button> */}
                            </Box>
                        </Aside>
                    </Grid>
                </Grid>
                <PropertiesSection properties={properties}/>
            </Container>
            <Footer>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    <Typography>Venda:</Typography>
                    <Typography variant="h6">R$ 500.000,00</Typography>
                </Box>
                <Button variant="outlined">Contato</Button>
            </Footer>
        </Box>
    )
}