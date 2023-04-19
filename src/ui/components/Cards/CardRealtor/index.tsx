import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

interface Props {
    image: string;
    link?: string;
    title?: string;
}

export function CardRelease({ image, link, title }: Props) {
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
                    sx={{ height: heigth, borderRadius: 1 }}
                    image={image}
                />}
            <CardContent sx={{
                padding: '8px !important'
            }}>
                <Typography variant="h6" sx={{
                    fontSize: 16,
                    fontWeight: 600,
                    textAlign: 'center'
                }}>{title}</Typography>
            </CardContent>
        </Card>
    )
}

export default CardRelease;