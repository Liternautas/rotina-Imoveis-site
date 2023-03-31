import { useFilter } from "@/src/contexts/FilterContext";
import { normalize } from "@/src/helpers/functions";
import { Autocomplete, Box, Button, Tab, Tabs, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { BackgroundHome, Container, Form, Title } from "./styles";

export function BannerHome() {
    const {address, type} = useFilter();
    const {city, district} = address;
    const [adType, setAdType] = useState(0);
    const router = useRouter();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setAdType(newValue);
    };

    const handleSubmit = async () => {
        let path = `/imoveis/filter?`;
        path = path + `adType=${adType === 0 ? 'venda' : 'aluguel'}`;
        {type.value ? path = path + `&type=${normalize(type.value.name)}` : null}
        {city.value ? path = path + `&cityId=${city.value.id}` : null}
        {district.value ? path = path + `&districtId=${district.value.id}` : null}

        router.push(path);
    }

    return (
        <Container sx={{
            borderRadius: 2,
        }}>
            <Title variant="h1">
                Sua casa dos <span>sonhos</span> está apenas a um <span>clique</span> de distância.
            </Title>
            <Form>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={adType} onChange={handleChange} aria-label="basic tabs example">
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
                <Box sx={{ display: "flex", gap: 2, flexGrow: 1 }}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={city.options}
                        value={city.value}
                        onChange={(e, value) => city.onChange(value)}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} label="Cidade" />}
                        renderOption={(props, option) => <Box component={'li'} {...props}>{option.name}</Box>}
                        fullWidth
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
                        fullWidth
                    />
                </Box>
                <Button variant="contained" fullWidth sx={{
                    color: ' #fff',
                    fontWeight: 600,
                    height: 48
                }} onClick={handleSubmit}>Buscar resultados</Button>
            </Form>
            <BackgroundHome />
        </Container>
    )
}

export default BannerHome;