import { BedOutlined, DirectionsCarOutlined, Rule, ShowerOutlined, SquareFoot, SquareFootOutlined } from "@mui/icons-material";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";

export function CardAdmin() {
    return (
        <Card sx={{position: 'relative'}}>
            <CardMedia
                sx={{ height: 190 }}
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
            }}>Aluguel</Box>
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
                        <Typography>100m²</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <BedOutlined />
                        <Typography>3</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <ShowerOutlined />
                        <Typography>2</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <DirectionsCarOutlined />
                        <Typography>2</Typography>
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