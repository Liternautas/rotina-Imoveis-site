import { useFilter } from "@/src/contexts/FilterContext";
import { normalize } from "@/src/helpers/functions";
import { useSelect } from "@/src/hooks/useSelect";
import { Autocomplete, Box, Button, InputAdornment, Tab, Tabs, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { FilterContainer } from "./styles";

export function Filter() {
    const router = useRouter();
    const {address, type, adType} = useFilter();
    const {city, district} = address;

    const handleSubmit = async () => {
        let path = `/imoveis/filter?`;
        path = path + `adType=${adType.value.id <= 1 ? 'venda' : 'aluguel'}`;
        {type.value ? path = path + `&type=${normalize(type.value.name)}` : null}
        {city.value ? path = path + `&cityId=${city.value.id}` : null}
        {district.value ? path = path + `&districtId=${district.value.id}` : null}
        router.push(path);

    }

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        adType.onChange({
            id: newValue + 1
        });
    };
    return (
        <FilterContainer>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={+adType.value?.id - 1} onChange={handleChange} aria-label="basic tabs example">
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
                options={city.options}
                value={city.value}
                onChange={(e, value) => city.onChange(value)}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField {...params} label="Cidade" />}
                renderOption={(props, option) => <Box component={'li'} {...props}>{option.name}</Box>}
            />
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={district.options}
                value={district.value}
                onChange={(e, value) => district.onChange(value)}
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
            }} onClick={handleSubmit}>Filtrar</Button>
        </FilterContainer>
    )
}