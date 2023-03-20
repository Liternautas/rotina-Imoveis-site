import { Card, CardContent, CardMedia, Typography } from "@mui/material";

interface Props {
    image: string;
    title: string;
    subtitle: string;
}

export function CardDistrict({image, subtitle, title}: Props) {
    return (
        <Card sx={{
            boxShadow: "none",
            position: "relative",
            overflow: "hidden",
            borderRadius: '24px 0 24px 0'
        }}>
            {image && <CardMedia
                sx={{ height: 190, borderRadius: '24px 0 24px 0' }}
                image={image}
            />}
            <CardContent style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
                position: "absolute",
                top: 0, 
                left: 0,
                width: "100%",
                height: "100%",
                color: '#fff',
                background: "linear-gradient(112.9deg, #2F4F4F 0%, rgba(32, 52, 52, 0.8) 48.96%, #111818 100%)"
            }}>
                <Typography gutterBottom variant="h6" component="div" sx={{
                    fontSize: '18px',
                    fontWeight: 700,
                    marginBottom: 0
                }}>
                    Loteamento Ipanema
                </Typography>
                <Typography variant="subtitle1" sx={{
                    lineHeight: '140%'
                }}>10</Typography>
            </CardContent>
        </Card>
    )
}