import { useProperty } from "@/src/contexts/PropertyContext";
import { characteristics, extras, furniture, security } from "@/src/utils/data";
import { Box, Checkbox, Divider, FormControlLabel, Grid, Typography } from "@mui/material";
import { Count } from "../Form/Count";

export function Details() {
    const {
        numberBathroom,
        numberGarage,
        numberRooms,
        numberSuite,
        characteristics,
        details,
        security,
        extras,
        furnitures
    } = useProperty();

    return (
        <Box>
            <Box sx={{ mb: 4 }}>
                <Count
                    title="Número de quartos"
                    subtitle="Incluindo suites"
                    value={Number(numberRooms.value)}
                    setValue={numberRooms.setValue}
                />
                <Count
                    title="Número de banheiros"
                    subtitle="Incluindo suites"
                    value={Number(numberBathroom.value)}
                    setValue={numberBathroom.setValue}
                />
                <Count
                    title="Número de suites"
                    value={Number(numberSuite.value)}
                    setValue={numberSuite.setValue}
                />
                <Count
                    title="Número de garagens"
                    value={Number(numberGarage.value)}
                    setValue={numberGarage.setValue}
                />
            </Box>
            <Divider />
            <Box sx={{ my: 4 }}>
                <Typography variant="h6">Características:</Typography>
                <Grid container spacing={{ xs: 2, md: 1 }}>
                    {details?.characteristics.map(property => (
                        <Grid item xs={12} sm={6} md={3}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={characteristics.isActive(property)}
                                        onChange={() => characteristics.onChange(property)}
                                    />
                                }
                                label={property.name} />
                        </Grid>
                    ))
                    }
                </Grid>
            </Box>
            <Divider />
            <Box sx={{ my: 4 }}>
                <Typography variant="h6">Segurança:</Typography>
                <Grid container spacing={{ xs: 2, md: 1 }}>
                    {details?.security?.map(property => (
                        <Grid item xs={12} sm={6} md={3}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={security.isActive(property)}
                                        onChange={() => security.onChange(property)}
                                    />
                                }
                                label={property.name} />
                        </Grid>
                    ))
                    }
                </Grid>
            </Box>
            <Divider />
            <Box sx={{ my: 4 }}>
                <Typography variant="h6">Mobília:</Typography>
                <Grid container spacing={{ xs: 2, md: 1 }}>
                    {details?.furniture?.map(property => (
                        <Grid item xs={12} sm={6} md={3}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={furnitures.isActive(property)}
                                        onChange={() => furnitures.onChange(property)}
                                    />
                                }
                                label={property.name} />
                        </Grid>
                    ))
                    }
                </Grid>
            </Box>
            <Divider />
            <Box sx={{ my: 4 }}>
                <Typography variant="h6">Extras:</Typography>
                <Grid container spacing={{ xs: 2, md: 1 }}>
                    {details?.extras?.map(property => (
                        <Grid item xs={12} sm={6} md={3}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={extras.isActive(property)}
                                        onChange={() => extras.onChange(property)}
                                    />
                                }
                                label={property.name} />
                        </Grid>
                    ))
                    }
                </Grid>
            </Box>
            <Divider />
        </Box>
    )
}