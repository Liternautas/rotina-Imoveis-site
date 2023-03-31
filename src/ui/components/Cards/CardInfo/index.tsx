import { Card, CardContent, CardMedia, Typography } from "@mui/material";

interface Props {
    image: string;
    title: string;
    subtitle: string;
}

export function CardInfo({image, subtitle, title}: Props) {
    return (
        <Card sx={{
            boxShadow: "none",
            minWidth: 276
        }}>
            {image && <CardMedia
                sx={{ height: 190, borderRadius: 1 }}
                image={image}
            />}
            <CardContent style={{
                display: "flex",
                flexDirection: "column",
                padding: 0,
                marginTop: 8
            }}>
                <Typography gutterBottom variant="h6" component="div" sx={{
                    fontSize: '18px',
                    fontWeight: 700,
                    marginBottom: 0
                }}>
                    {title}
                </Typography>
                <Typography variant="subtitle1" sx={{
                    lineHeight: '140%'
                }}>{subtitle}</Typography>
            </CardContent>
        </Card>
    )
}