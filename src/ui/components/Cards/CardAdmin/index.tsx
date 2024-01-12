import { useState, useEffect } from "react";
import { findInOptions, getImageUrl } from "@/src/helpers/functions";
import { maskPrice } from "@/src/helpers/mask";
import { useSelect } from "@/src/hooks/useSelect";
import { AdType, IProperty } from "@/src/interfaces";
import { statusData } from "@/src/utils/data";
import { BedOutlined, DirectionsCarOutlined, Rule, ShowerOutlined, SquareFoot, SquareFootOutlined } from "@mui/icons-material";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography, Autocomplete, TextField, FormControlLabel, Switch } from "@mui/material";
import { useRouter } from "next/router";
import { Loading } from "../../Loading";
import { api } from "@/src/services/api";
import { DialogComponent } from "../../DialogComponent";
import { useProperty } from "@/src/contexts/PropertyContext";
import { ModalPropertyDetails } from "../../modals/ModalPropertyDetails";

interface Props {
    property: IProperty;
}

export function CardAdmin({ property }: Props) {
    const {remove, changeEmphasis, changeStatus} = useProperty();
    const router = useRouter();
    const [state, setState] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const status = useSelect(statusData);
    const { adType, type, address, id, images, numberBathroom, numberGarage, numberRooms, totalArea, code, price, emphasis } = property;

    const handleRemove = async (id: number) => {
        await remove(id);
    }

    const handleChangeEmphasis = async (value) => {
        await changeEmphasis(id, value);
        setState(value);
    }
    const handleChangeStatus = async (value) => {
        await changeStatus(id, value.enum);
        status.onChange(value);
    }

    useEffect(() => {
        {property.status && status.onChange(findInOptions(property.status, statusData))}
        {property.emphasis && setState(emphasis)}
    }, [property]);


    return (
        <Card sx={{
            position: 'relative',
            minHeight: 520
        }}>
            <CardMedia
                sx={{
                    height: 190,
                }}
                image={getImageUrl(images[0])}
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
            }}>{adType === AdType.venda ? 'Venda' : 'Aluguel'}</Box>
            <Box sx={{
                position: 'absolute',
                top: 48,
                left: 8,
                zIndex: 10,
                px: 1,
                py: .5,
                background: 'rgba(0, 0, 0, .5)',
                color: '#fff',
                borderRadius: 1
            }}>{code}</Box>
            {type?.name && <Box sx={{
                position: 'absolute',
                top: 88,
                left: 8,
                zIndex: 10,
                px: 1,
                py: .5,
                background: 'rgba(0, 0, 0, .5)',
                color: '#fff',
                borderRadius: 1
            }}>{type?.name}</Box>}

            <CardContent style={{
                display: "flex",
                flexDirection: "column",
                gap: 2
            }}>
                <Typography gutterBottom variant="h6" component="div" sx={{ mb: 0 }}>
                    {address.district?.name}
                </Typography>
                <Typography gutterBottom variant="subtitle2" component="div">
                    {address.city?.name}
                </Typography>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between'
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
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={status.options}
                    sx={{ width: 300, mt: 1 }}
                    value={status.value}
                    onChange={(e, value) => handleChangeStatus(value)}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="Status" />}
                    renderOption={(props, option) => <Box component={'li'} {...props}>{option.name}</Box>}
                />
                <FormControlLabel
                    control={
                        <Switch checked={state} onChange={(e, check) => handleChangeEmphasis(check)} name="gilad" />
                    }
                    label="Destaque"
                />
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => router.push(`/admin/properties/update/${id}`)}>Editar</Button>
                <DialogComponent
                    title="Deletar anúncio"
                    description="Deseja mesmo deletar esse anúncio?"
                    onSubmit={() => handleRemove(id)}
                >
                    <Button size="small">Remover</Button>
                </DialogComponent>
                <Button size="small" onClick={() => setShowDetails(true)}>Detalhes</Button>
            </CardActions>
            <Loading open={loading} />
            <ModalPropertyDetails open={showDetails} close={() => setShowDetails(false)} property={property}/>
        </Card>
    )
}