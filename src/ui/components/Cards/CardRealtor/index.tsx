import Image from "next/image";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { getImageUrl } from "@/src/helpers/functions";

interface Props {
    image: string;
    link?: string;
    title?: string;
    subtitle?: string;
}

export function CardRelease({ image, link, title, subtitle }: Props) {
    const ref = useRef(null);
    const [heigth, setHeight] = useState(190);
    const router = useRouter();

    useEffect(() => {
        if (ref.current) {
            const width = ref.current.clientWidth;
            setHeight(width);
        }
    }, [ref.current]);

    return (
        <Card
            ref={ref}
            sx={{ position: 'relative' }}
            onClick={() => link && router.push(link)}
            style={{
                boxShadow: 'none',
                minWidth: 200,
                maxWidth: 220
            }}
        >
            {image &&
                <CardMedia
                    sx={{ height: heigth, borderRadius: 1, position: 'relative' }}
                >
                    {image && <Image loading="eager" fill sizes="200px" src={getImageUrl(image)} alt="" />}
                </CardMedia>
            }
            <CardContent sx={{
                padding: '8px !important'
            }}>
                <Typography variant="h6" sx={{
                    fontSize: 16,
                    fontWeight: 600,
                    textAlign: 'center'
                }}>{title}</Typography>
                <Typography variant="h6" sx={{
                    fontSize: 14,
                    fontWeight: 500,
                    textAlign: 'center'
                }}>{subtitle}</Typography>
            </CardContent>
        </Card>
    )
}

export default CardRelease;