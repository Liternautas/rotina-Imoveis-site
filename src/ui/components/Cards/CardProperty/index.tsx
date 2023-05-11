import Image from "next/image";
import { getImageUrl } from "@/src/helpers/functions";
import { maskPrice } from "@/src/helpers/mask";
import { AdType, IProperty } from "@/src/interfaces";
import { BedOutlined, DirectionsCarOutlined, ShowerOutlined, SquareFootOutlined } from "@mui/icons-material";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import Link from "next/link";
import slugify from "slugify";

interface Props {
    property: IProperty;
}

export function CardProperty({ property }: Props) {
    const { type, adType, address, code, images } = property;

    const normalize = (value: string) => slugify(value, { lower: true });

    return (
        <Link href={`imovel/${adType === 'aluguel' ? `${type.slug}-para-alugar` : `${type.slug}-a-venda`}-em-${normalize(address.city.name)}-${normalize(address.district.name)}/${code}`}>
            <Card sx={{
                w: '313px',
                height: '364px',
                minWidth: '276px',
                boxShadow: 'none',
                border: '.5px solid #eee',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <CardMedia
                    sx={{ height: 190, position: 'relative' }}
                >
                    {images && <Image loading="eager" fill sizes="274px" src={getImageUrl(images[0])} alt="" />}
                </CardMedia>
                <Box sx={{
                    position: 'absolute',
                    top: 8,
                    left: 8,
                    zIndex: 10,
                    px: 1,
                    py: .5,
                    background: 'rgba(0, 0, 0, .5)',
                    color: '#fff',
                    borderRadius: 1
                }}>{adType === AdType.venda ? 'Venda' : 'Aluguel'}</Box>
                {type?.name && <Box sx={{
                    position: 'absolute',
                    top: 48,
                    left: 8,
                    zIndex: 10,
                    px: 1,
                    py: .5,
                    background: 'rgba(0, 0, 0, .5)',
                    color: '#fff',
                    borderRadius: 1
                }}>{type?.name}</Box>}
                <CardContent sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: 'space-between',
                    gap: 1,
                    padding: '8px !important',
                    marginTop: 1,
                    flex: 1
                }}>
                    <Box>
                        <Typography sx={{
                            fontSize: 14,
                            fontWeight: 600,
                            lineHeight: '140%',
                            color: "primary.main"
                        }} variant="h2">{property.type.name}</Typography>
                        <Typography sx={{
                            fontSize: 20,
                            fontWeight: 600,
                            lineHeight: '140%'
                        }} variant="h2">{property.address.district.name ?? property.type.name}</Typography>
                        <Typography sx={{
                            fontSize: 14,
                            fontWeight: 500,
                            lineHeight: '140%'
                        }} variant="h2">{property.address.city.name} - {property.address.state.shortName}</Typography>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <SquareFootOutlined sx={{ color: "#333" }} />
                                <Typography sx={{
                                    fontSize: 14,
                                    fontWeight: 600,
                                    color: "#333"
                                }}>{property.totalArea}m²</Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <BedOutlined sx={{ color: "#333" }} />
                                <Typography sx={{
                                    fontSize: 14,
                                    fontWeight: 600,
                                    color: "#333"
                                }}>{property.numberRooms}</Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <ShowerOutlined sx={{ color: "#333" }} />
                                <Typography sx={{
                                    fontSize: 14,
                                    fontWeight: 600,
                                    color: "#333"
                                }}>{property.numberBathroom}</Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <DirectionsCarOutlined sx={{ color: "#333" }} />
                                <Typography sx={{
                                    fontSize: 14,
                                    fontWeight: 600,
                                    color: "#333"
                                }}>{property.numberGarage}</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Typography sx={{
                        fontSize: 20,
                        fontWeight: 600,
                        color: 'secondary.main'
                    }} variant="subtitle1">R$ {maskPrice(property.price)}</Typography>
                </CardContent>
            </Card>
        </Link>
    )
}

export default CardProperty;