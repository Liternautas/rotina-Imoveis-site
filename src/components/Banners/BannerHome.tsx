import { useSelect } from "@/src/hooks/useSelect";
import { Autocomplete, Box, Button, Tab, Tabs, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { BackgroundHome, Container, Form, Title } from "./styles";

export function BannerHome() {
    const [value, setValue] = useState(0);
    const type = useSelect();
    const router = useRouter();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Container sx={{
            borderRadius: 2,
            overflow: "hidden"
        }}>
            <Title variant="h1">
                Sua casa dos <span>sonhos</span> está apenas a um <span>clique</span> de distância.
            </Title>
            <Form>
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
                <Box sx={{ display: "flex", gap: 2, flexGrow: 1 }}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={type.options}
                        value={type.value}
                        onChange={(e, value) => type.onChange(value)}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} label="Cidade" />}
                        renderOption={(props, option) => <Box component={'li'} {...props}>{option.name}</Box>}
                        fullWidth
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
                        fullWidth
                    />
                </Box>
                <Button variant="contained" fullWidth sx={{
                    color: ' #fff',
                    fontWeight: 600,
                    height: 48
                }} onClick={() => router.push('/imoveis/filter')}>Buscar resultados</Button>
            </Form>
            <BackgroundHome />
        </Container>
    )
}