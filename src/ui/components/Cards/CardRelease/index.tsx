import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

interface Props {
    image: string;
    link?: string;
}

export function CardRelease({ image, link }: Props) {
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
                minWidth: 276
            }}
        >
            {image && <CardMedia
                sx={{ height: heigth }}
                image={image}
            />}
        </Card>
    )
}