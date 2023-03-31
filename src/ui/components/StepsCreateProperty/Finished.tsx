import { useProperty } from "@/src/contexts/PropertyContext";
import { useSelect } from "@/src/hooks/useSelect";
import { Autocomplete, Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

export function Finished() {
    const {pickup, owner} = useProperty();
    const type = useSelect();
    return (
        <Box>
            <Box sx={{ mb: 5 }}>
                <Typography sx={{ mb: 2 }} variant="h6">Responsaveis do imóvel?</Typography>
                <Box sx={{
                    display: 'flex',
                    gap: 2,
                    mb: 2
                }}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={owner?.options}
                        sx={{ width: 300 }}
                        value={owner.value}
                        onChange={(e, value) => owner.onChange(value)}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} label="Proprietário" />}
                        renderOption={(props, option) => <Box component={'li'} {...props}>{option.name}</Box>}
                    />
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={pickup?.options}
                        sx={{ width: 300 }}
                        value={pickup.value}
                        onChange={(e, value) => pickup.onChange(value)}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} label="Captador" />}
                        renderOption={(props, option) => <Box component={'li'} {...props}>{option.name}</Box>}
                    />
                </Box>
                <Button>Não encontrou? Cadastre aqui</Button>
            </Box>
        </Box>
    )
}