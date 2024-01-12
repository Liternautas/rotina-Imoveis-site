import { getImageUrl } from "@/src/helpers/functions";
import { IProperty } from "@/src/interfaces";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

interface Props {
    property: IProperty;
    isLink?: boolean;
}

export function CardPropertyTable({ property, isLink }: Props) {
    return (
        <Card sx={{
            display: 'flex',
            flexDirection: 'row',
            boxShadow: 'none',
            background: 'transparent'
        }}>
            <CardMedia
                sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 1,
                }}
                image={getImageUrl(property?.images[0])}
            />
            <CardContent sx={{
                p: '8px !important',
                pb: 1,
                flex: 1,
            }}>
                <Typography sx={{
                    fontSize: 14,
                    fontWeight: 500
                }}>
                    {property?.code}, {property?.type?.name}, {property?.adType}
                </Typography>
                {property?.address &&
                    <Typography sx={{
                        fontSize: 14,
                        fontWeight: 500
                    }}>
                        {property?.address?.district.name ?? property.type.name}, {property?.address?.city.name}
                    </Typography>
                }
            </CardContent>
        </Card>
    )
}