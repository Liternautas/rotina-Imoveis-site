import {useEffect} from "react";
import { useProperty } from "@/src/contexts/PropertyContext";
import { useSelect } from "@/src/hooks/useSelect";
import { Autocomplete, Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { ModalAddUser } from "../modals/ModalAddUser";
import { useUser } from "@/src/contexts/UserContext";

export function Finished() {
    const { pickup, owner } = useProperty();
    const { owners, realtors } = useUser();
    
    useEffect(() => {
        if(owners && owners.length > 0) {
            owner.setOptions(owners)
        }
        if(realtors && realtors.length > 0) {
            pickup.setOptions(realtors)
        }
    }, [owners, realtors]);

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
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                }}>
                    <Typography>Não encontrou?</Typography>
                    <ModalAddUser />
                </Box>
            </Box>
        </Box>
    )
}