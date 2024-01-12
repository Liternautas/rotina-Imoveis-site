import { maskPrice } from "@/src/helpers/mask";
import { IProperty } from "@/src/interfaces";
import { BedOutlined, Close, DirectionsCarOutlined, ShowerOutlined, SquareFootOutlined } from "@mui/icons-material";
import { Box, CardContent, IconButton, Modal, Typography } from "@mui/material";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 600,
    width: '100%',
    height: {
        xs: '100vh',
        lg: 'fit-content'
    },
    bgcolor: 'background.paper',
    borderRadius: 1,
    boxShadow: 24,
    p: {
        md: 4,
        xs: '32px 16px'
    },
    display: 'flex',
    flexDirection: 'column',
    gap: 2
};

export function ModalPropertyDetails({ property, open, close }: { property: IProperty, open: boolean, close: () => void }) {
    const { type, adType, address, totalArea, numberBathroom, numberGarage, numberRooms, numberSuite, price, owner, pickup } = property;
    return (
        <Modal
            open={open}
            onClose={close}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <IconButton onClick={close} sx={{
                    w: 40,
                    h: 40,
                    position: 'absolute',
                    top: 8,
                    right: 8
                }}><Close /></IconButton>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Detalhes do imóvel - {property.code}
                </Typography>
                <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2
                }}>
                    <CardContent style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2
                    }}>
                        <Typography gutterBottom variant="h6" component="div" sx={{ mb: 0 }}>
                            {type.name}, {adType}, {address.district?.name} - {address.city?.name}
                        </Typography>

                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            gap: '2rem',
                            mt: 2
                        }}>
                            {totalArea > 0 && <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <SquareFootOutlined />
                                <Typography>{totalArea}m²</Typography>
                            </Box>}
                            {numberRooms > 0 && <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <BedOutlined />
                                <Typography>{numberRooms}</Typography>
                            </Box>}
                            {numberBathroom > 0 && <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <ShowerOutlined />
                                <Typography>{numberBathroom}</Typography>
                            </Box>}
                            {numberGarage > 0 && <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <DirectionsCarOutlined />
                                <Typography>{numberGarage}</Typography>
                            </Box>}
                        </Box>
                        <Typography variant="h5" sx={{
                            fontWeight: 600,
                            my: 2,
                            fontSize: 18
                        }}>R$ {maskPrice(price)}</Typography>

                        {owner &&
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                mt: 2
                            }}>
                                <strong>Proprietário</strong>
                                <Typography>{owner.name}</Typography>
                                <Typography>{owner.email}</Typography>
                                <Typography>{owner.phone}</Typography>
                            </Box>
                        }
                        {pickup &&
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                mt: 2
                            }}>
                                <strong>Corretor</strong>
                                <Typography>{pickup.name}</Typography>
                                <Typography>{pickup.email}</Typography>
                                <Typography>{pickup.phone}</Typography>
                            </Box>
                        }
                    </CardContent>
                </Box>
            </Box>
        </Modal>
    )
}