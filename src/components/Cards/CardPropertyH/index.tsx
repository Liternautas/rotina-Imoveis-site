import { AdType, IProperty } from "@/src/interfaces";
import { BedOutlined, DirectionsCarOutlined, ShowerOutlined, SquareFootOutlined } from "@mui/icons-material";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import Link from "next/link";

interface Props {
    property: IProperty;
    isLink?: boolean;
}

export function CardPropertyH({ property, isLink }: Props) {
    return (
        <>
            {isLink === false ?
                <CardComponent property={property} />
                :
                <Link href={'/imovel/teste'}>
                    <CardComponent property={property} />
                </Link>
            }
        </>
    )
}

function CardComponent({ property }: Props) {
    const {adType, type, code} = property;
    return (
        <Card sx={{
            position: 'relative',
            display: 'flex',
            boxShadow: '0 2px 4px rgba(0, 0, 0, .15)'
        }}>
            <CardMedia
                sx={{ width: 300, height: 190 }}
                image="https://casacor.abril.com.br/wp-content/uploads/sites/7/2022/01/Casa-Liu-Raiz-Arquitetura-Foto-Leonardo-Giantomasi-2.jpg?quality=90&strip=info"
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
            <Box sx={{
                position: 'absolute',
                top: 48,
                left: 8,
                zIndex: 10,
                px: 1,
                py: .5,
                background: 'rgba(0, 0, 0, .5)',
                color: '#fff',
                borderRadius: 1
            }}>{code}</Box>
            {type?.name && <Box sx={{
                position: 'absolute',
                top: 88,
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
                justifyContent: "space-between",
                gap: 1,
                padding: '0 8px',
                marginTop: 1
            }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
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
                            }}>120m²</Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <BedOutlined sx={{ color: "primary.main" }} />
                            <Typography sx={{
                                fontSize: 14,
                                fontWeight: 600,
                                color: 'secondary.main',
                            }}>4</Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <ShowerOutlined sx={{ color: "primary.main" }} />
                            <Typography sx={{
                                fontSize: 14,
                                fontWeight: 600,
                                color: 'secondary.main',
                            }}>2</Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <DirectionsCarOutlined sx={{ color: "primary.main" }} />
                            <Typography sx={{
                                fontSize: 14,
                                fontWeight: 600,
                                color: 'secondary.main',
                            }}>1</Typography>
                        </Box>
                    </Box>
                </Box>
                <Typography sx={{
                    fontSize: 20,
                    fontWeight: 600,
                    color: 'secondary.main'
                }}>R$ 200.000,00</Typography>
            </CardContent>
        </Card>
    )
}

