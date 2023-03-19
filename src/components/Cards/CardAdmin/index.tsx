import { AdType, IProperty } from "@/src/interfaces";
import { BedOutlined, DirectionsCarOutlined, Rule, ShowerOutlined, SquareFoot, SquareFootOutlined } from "@mui/icons-material";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { useRouter } from "next/router";

interface Props {
    property: IProperty;
}

export function CardAdmin({property}: Props) {
    const router = useRouter();
    const {adType, address, description, exemptIptu, favorites, id, images, iptu, numberBathroom, numberGarage, numberRooms, totalArea, usefulArea} = property;

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
            <CardContent style={{
                display: "flex",
                flexDirection: "column",
                gap: 2
            }}>
                <Typography gutterBottom variant="h6" component="div">
                    Loteamento Ipanema, Catalão
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
                }}>R$ 1.500,00</Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Editar</Button>
                <Button size="small">Detalhes</Button>
            </CardActions>
        </Card>
    )
}