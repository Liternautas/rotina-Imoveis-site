import { getImageUrl } from "@/src/helpers/functions";
import { maskPrice } from "@/src/helpers/mask";
import { IProperty, IRentalContract } from "@/src/interfaces";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

interface Props {
    contract: IRentalContract;
    isLink?: boolean;
    onChange?: () => void;
}

export function CardRentalContract({ contract, isLink, onChange }: Props) {
    return (
        <Box
            onClick={onChange}
            sx={{
                cursor: 'pointer',
                p: 1,
                border: 1,
                borderColor: '#ddd',
                borderRadius: 1
            }}>
            <Typography sx={{
                fontSize: 16,
                fontWeight: 600,
                mb: 1
            }}>Contrato de Aluguel</Typography>
            <Typography sx={{
                fontSize: 14,
                fontWeight: 500,
                mb: 1
            }}>
                Inquilino: {contract.tenant.name}
            </Typography>
            <Typography sx={{
                fontSize: 18,
                fontWeight: 500,
                mb: 1
            }}>
                R$ {maskPrice(contract.price)}
            </Typography>
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
                    image={getImageUrl(contract.property.images[0])}
                />
                <CardContent sx={{
                    p: 0,
                    pl: '8px !important',
                    flex: 1,
                }}>
                    <Typography sx={{
                        fontSize: 14,
                        fontWeight: 500
                    }}>
                        Cod.: {contract.property.code}
                    </Typography>
                    {contract.property?.address &&
                        <Typography sx={{
                            fontSize: 14,
                            fontWeight: 500
                        }}>
                            {contract.property?.address?.district.name ?? contract.property.type.name}, {contract.property?.address?.city.name}
                        </Typography>
                    }
                </CardContent>
            </Card>
        </Box>
    )
}