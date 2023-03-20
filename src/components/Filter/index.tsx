import { useSelect } from "@/src/hooks/useSelect";
import { Autocomplete, Box, Button, InputAdornment, Tab, Tabs, TextField } from "@mui/material";
import { useState } from "react";
import { FilterContainer } from "./styles";

export function Filter() {
    const [value, setValue] = useState(0);
    const type = useSelect();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <FilterContainer>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Comprar" />
                    <Tab label="Alugar" />
                </Tabs>
            </Box>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={type.options}
                value={type.value}
                onChange={(e, value) => type.onChange(value)}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField {...params} label="Tipo do imóvel" />}
                renderOption={(props, option) => <Box component={'li'} {...props}>{option.name}</Box>}
            />
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={type.options}
                value={type.value}
                onChange={(e, value) => type.onChange(value)}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField {...params} label="Cidade" />}
                renderOption={(props, option) => <Box component={'li'} {...props}>{option.name}</Box>}
            />
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={type.options}
                value={type.value}
                onChange={(e, value) => type.onChange(value)}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField {...params} label="Bairro" />}
                renderOption={(props, option) => <Box component={'li'} {...props}>{option.name}</Box>}
            />
            <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                    label="Preço Minimo"
                    variant="outlined"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                    }}
                />
                <TextField
                    label="Preço Máximo"
                    variant="outlined"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                    }}
                />
            </Box>
            <Button variant="contained" sx={{
                height: 48,
                color: '#fff'
            }}>Filtrar</Button>
        </FilterContainer>
    )
}