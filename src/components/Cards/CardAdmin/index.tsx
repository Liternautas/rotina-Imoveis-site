import { maskPrice } from "@/src/helpers/mask";
import { AdType, IProperty } from "@/src/interfaces";
import { BedOutlined, DirectionsCarOutlined, Rule, ShowerOutlined, SquareFoot, SquareFootOutlined } from "@mui/icons-material";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { useRouter } from "next/router";

interface Props {
    property: IProperty;
}

export function CardAdmin({property}: Props) {
    const router = useRouter();
    const {adType, type, address, description, exemptIptu, favorites, id, images, iptu, numberBathroom, numberGarage, numberRooms, totalArea, usefulArea, code, price} = property;

    return (
        <Card sx={{position: 'relative'}} onClick={() => router.push(`/admin/properties/update/${id}`)}>
            {images && images.length > 0 && <CardMedia
                sx={{ height: 190 }}
                image={`http://localhost:8080/${images[0]}`}
            />}
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
            <CardContent style={{
                display: "flex",
                flexDirection: "column",
                gap: 2
            }}>
                <Typography gutterBottom variant="h6" component="div" sx={{mb: 0}}>
                    {address.district?.name}
                </Typography>
                <Typography gutterBottom variant="subtitle2" component="div">
                    {address.city?.name}
                </Typography>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <SquareFootOutlined />
                        <Typography>{totalArea}m²</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <BedOutlined />
                        <Typography>{numberRooms}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <ShowerOutlined />
                        <Typography>{numberBathroom}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <DirectionsCarOutlined />
                        <Typography>{numberGarage}</Typography>
                    </Box>
                </Box>
                <Typography variant="h5" sx={{
                    fontWeight: 600,
                    mt: 2
                }}>R$ {maskPrice(price)}</Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Editar</Button>
                <Button size="small">Detalhes</Button>
            </CardActions>
        </Card>
    )
}