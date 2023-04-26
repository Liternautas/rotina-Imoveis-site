import { useState, useEffect } from "react";
import { maskPrice } from "@/src/helpers/mask";
import { IProperty } from "@/src/interfaces";
import { Gallery } from "@/src/ui/components/Gallery";
import { GalleryMobile } from "@/src/ui/components/GalleryMobile";
import { PropertiesSection } from "@/src/ui/components/Sections/PropertiesSection";
import { FavoriteBorderOutlined, ShareOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, Container, Divider, Grid, Typography } from "@mui/material";
import { Aside, Description, Footer, GridItem, Subtitle, Title } from "./styles";
import { ModalScheduling } from '@/src/ui/components/modals/ModalScheduling';
import { ModalContact } from '@/src/ui/components/modals/ModalContact';
import { getImageUrl, getImmobileTitleCard, normalize } from "@/src/helpers/functions";
import { HeadComponent } from "@/src/ui/components/HeadComponent";

interface IShareData {
    title: string;
    text: string;
    url: string;
}

interface Props {
    property: IProperty;
    properties: IProperty[];
}

export function Property({ properties, property }: Props) {
    const { type, adType, address, code, numberBathroom, numberGarage, numberRooms, numberSuite, description, details, condominium, exemptIptu, favorites, id, images, iptu, owner, pickup, price, totalArea, usefulArea } = property;
    const characteristics = details.filter(detail => detail.type === 'characteristics');
    const furniture = details.filter(detail => detail.type === 'furniture');
    const security = details.filter(detail => detail.type === 'security');
    const extras = details.filter(detail => detail.type === 'extras');
    const priceFinal = Number(condominium) + Number(price);
    const [shareData, setShareData] = useState<IShareData>(null);

    if (!property) {
        return <div style={{ height: '60vh' }}></div>;
    }

    useEffect(() => {
        if (property) {
            var url = window.location.hostname;
            setShareData({
                text: getImmobileTitleCard(property) + ', ' + property.address.city?.name + ' - ' + property.address.state?.name + ' - Rotina Imóveis',
                title: getImmobileTitleCard(property) + ', ' + property.address.city?.name + ' - ' + property.address.state?.name + ' - Rotina Imóveis',
                url: url + `/imovel/${property.adType}/${normalize(property.address.city?.name)}/${normalize(property.address.district?.name) ?? ''}/${property.code}`,
            })
        }
    }, [property]);

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
            <HeadComponent
                title={`${type.name} ${adType === 'aluguel' ? `para alugar` : `à venda`} ${address.district && `no bairro ${address.district.name}`} - ${address.city.name}, ${address.state.name} - Rotina Imóveis`}
            />
            <GalleryMobile images={images}/>
            <Container>
                <Grid container spacing={{ md: 3 }} sx={{ mb: 6 }}>
                    <Grid item md={8} sx={{
                        mt: {
                            xs: 2
                        }
                    }}>
                        <Title>{type.name} {adType === 'aluguel' ? `para alugar` : `à venda`} {address.district && `no ${address.district.name}`}</Title>
                        <Subtitle>{address.city.name}, {address.state.name}</Subtitle>
                        <Gallery images={images} />
                        <Description>{description}</Description>
                        <Box sx={{
                            display: 'flex',
                            gap: 1
                        }}>
                            <Button variant="outlined" sx={{ display: "flex", gap: 1 }}><FavoriteBorderOutlined /> Favoritar</Button>
                            <Button variant="outlined" sx={{ display: "flex", gap: 1 }} onClick={async () => await navigator.share(shareData)}><ShareOutlined /> Compartilhar</Button>
                        </Box>
                        <Divider sx={{
                            mt: 4
                        }} />
                        <Box sx={{
                            mt: 4
                        }}>
                            <Subtitle sx={{ mb: 1, fontSize: 18 }}>Detalhes</Subtitle>
                            <Grid container spacing={{ md: 1 }}>
                                <GridItem item xs={6} md={4}><span>{numberRooms} quartos</span></GridItem>
                                <GridItem item xs={6} md={4}><span>{numberSuite} suíte</span></GridItem>
                                <GridItem item xs={6} md={4}><span>{numberBathroom} banheiros</span></GridItem>
                                <GridItem item xs={6} md={4}><span>{numberGarage} garagens</span></GridItem>
                                <GridItem item xs={6} md={4}><span>{usefulArea}m² de área útil</span></GridItem>
                                <GridItem item xs={6} md={4}><span>{totalArea}m² de área total</span></GridItem>
                            </Grid>
                        </Box>
                        {characteristics.length > 0 &&
                            <>
                                <Divider sx={{
                                    mt: 4
                                }} />
                                <Box sx={{
                                    mt: 4,
                                }}>
                                    <Subtitle sx={{ mb: 1, fontSize: 18 }}>Caracteristicas</Subtitle>
                                    <Grid container spacing={{ md: 1 }}>
                                        {characteristics.map(item => (
                                            <GridItem item xs={6} md={4}><span>{item.name}</span></GridItem>
                                        ))}
                                    </Grid>
                                </Box>
                            </>
                        }
                        {security.length > 0 &&
                            <>
                                <Divider sx={{
                                    mt: 4
                                }} />
                                <Box sx={{
                                    mt: 4
                                }}>
                                    <Subtitle sx={{ mb: 1, fontSize: 18 }}>Segurança</Subtitle>
                                    <Grid container spacing={{ md: 1 }}>
                                        {security.map(item => (
                                            <GridItem item xs={6} md={4}><span>{item.name}</span></GridItem>
                                        ))}
                                    </Grid>
                                </Box>
                            </>
                        }
                        {furniture.length > 0 &&
                            <>
                                <Divider sx={{
                                    mt: 4
                                }} />
                                <Box sx={{
                                    mt: 4
                                }}>
                                    <Subtitle sx={{ mb: 1, fontSize: 18 }}>Mobilia</Subtitle>
                                    <Grid container spacing={{ md: 1 }}>
                                        {furniture.map(item => (
                                            <GridItem item xs={6} md={4}><span>{item.name}</span></GridItem>
                                        ))}
                                    </Grid>
                                </Box>
                            </>
                        }
                        {extras.length > 0 &&
                            <>
                                <Divider sx={{
                                    mt: 4
                                }} />
                                <Box sx={{
                                    mt: 4
                                }}>
                                    <Subtitle sx={{ mb: 1, fontSize: 18 }}>Extras</Subtitle>
                                    <Grid container spacing={{ md: 1 }}>
                                        {extras.map(item => (
                                            <GridItem item xs={6} md={4}><span>{item.name}</span></GridItem>
                                        ))}
                                    </Grid>
                                </Box>
                            </>
                        }
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
                            {pickup && <Box sx={{
                                display: "flex",
                                gap: 1,
                                mt: 2
                            }}>
                                <Avatar src={getImageUrl(pickup.avatar)}>{pickup.name.substring(0, 1)}</Avatar>
                                <Box>
                                    <Typography>{pickup.name}</Typography>
                                    <Typography sx={{
                                        fontSize: 14
                                    }}>{pickup.email}</Typography>
                                    <Button sx={{
                                        p: 0
                                    }}>Veja mais imóveis desse corretor</Button>
                                </Box>
                            </Box>}
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1.5,
                                mt: 2
                            }}>
                                <ModalContact property={property} />
                                <ModalScheduling property={property} />
                            </Box>
                        </Aside>
                    </Grid>
                </Grid>
                <PropertiesSection properties={properties} />
            </Container>
            <Footer>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    <Typography sx={{textTransform: 'capitalize'}}>{adType}:</Typography>
                    <Typography variant="h6">R$ {maskPrice(price)}</Typography>
                </Box>
                <ModalContact property={property} />
            </Footer>
        </Box>
    )
}