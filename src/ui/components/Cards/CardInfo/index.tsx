import Image from "next/image";
import { getImageUrl } from "@/src/helpers/functions";
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
                >
                    {image && <Image src={getImageUrl(image)} alt="" />}
                </CardMedia>
            }
            <CardContent sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
                marginTop: 0,
                position: 'absolute',
                top: 0,
                left: 0,
                p: 1,
                pb: '8px !important',
                bgcolor: 'rgba(0, 0, 0, .5)',
                height: 190,
                width: '100%',
                borderRadius: 1,
                color: '#fff'
            }}>
                <Typography gutterBottom variant="h2" sx={{
                    fontSize: '18px',
                    fontWeight: 700,
                    marginBottom: 0,
                }}>
                    {title}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default CardInfo;