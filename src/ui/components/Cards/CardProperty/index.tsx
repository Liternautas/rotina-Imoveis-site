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
    const { type, adType, address, code } = property;

    const normalize = (value: string) => slugify(value, { lower: true });

    return (
        <Link href={`imovel/${adType === 'aluguel' ? `${type.slug}-para-alugar` : `${type.slug}-a-venda`}-em-${normalize(address.city.name)}-${normalize(address.district.name)}/${code}`}>
            <Card sx={{
                w: '276px',
                minWidth: '276px',
                boxShadow: 'none'
            }}>
                <CardMedia
                    sx={{ height: 190, borderRadius: 1 }}
                    image={getImageUrl(property.images[0])}
                />
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
                    gap: 1,
                    padding: '0 8px',
                    marginTop: 1
                }}>
                    <Typography sx={{
                        fontSize: 20,
                        fontWeight: 600,
                        lineHeight: '140%'
                    }}>{property.address.district.name ?? property.type.name}, {property.address.city.name}</Typography>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <SquareFootOutlined sx={{ color: "primary.main" }} />
                            <Typography sx={{
                                fontSize: 14,
                                fontWeight: 600,
                                color: 'secondary.main',
                            }}>{property.totalArea}m²</Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <BedOutlined sx={{ color: "primary.main" }} />
                            <Typography sx={{
                                fontSize: 14,
                                fontWeight: 600,
                                color: 'secondary.main',
                            }}>{property.numberRooms}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <ShowerOutlined sx={{ color: "primary.main" }} />
                            <Typography sx={{
                                fontSize: 14,
                                fontWeight: 600,
                                color: 'secondary.main',
                            }}>{property.numberBathroom}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <DirectionsCarOutlined sx={{ color: "primary.main" }} />
                            <Typography sx={{
                                fontSize: 14,
                                fontWeight: 600,
                                color: 'secondary.main',
                            }}>{property.numberGarage}</Typography>
                        </Box>
                    </Box>
                    <Typography sx={{
                        fontSize: 20,
                        fontWeight: 600,
                        color: 'secondary.main'
                    }}>R$ {maskPrice(property.price)}</Typography>
                </CardContent>
            </Card>
        </Link>
    )
}

export default CardProperty;