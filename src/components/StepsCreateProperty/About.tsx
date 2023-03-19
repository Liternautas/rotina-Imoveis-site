import { useProperty } from "@/src/contexts/PropertyContext";
import { OptionSelectProps } from "@/src/hooks/useSelect";
import { Autocomplete, Box, Button, Checkbox, FormControl, FormControlLabel, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";



export function About() {
    const { address, type, exemptIptu, iptu, price, description, totalArea, usefulArea, adType } = useProperty();
    const { city, district, state, complement, number, route, zipcode } = address;

    const [value, setValue] = useState(0);
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState<{
        [k: number]: boolean;
    }>({});

    return (
        <Box>
            {/* O que você deseja fazer? */}
            <Box sx={{ mb: 5 }}>
                <Typography sx={{ mb: 2 }} variant="h6">O que você deseja fazer?</Typography>
                <Box sx={{ display: "flex", gap: 2, width: 'fit-content' }}>
                    {adType.options.map(item => (
                        <Button variant={adType.value?.id === item.id ? "contained" : "outlined"} sx={{ color: adType.value?.id === item.id && '#fff' }} onClick={() => adType.onChange(item)}>{item.name}</Button>
                    ))}
                </Box>
            </Box>

            {/* Qual o tipo do seu imóvel? */}
            <Box sx={{ width: 300, mb: 5 }}>
                <Typography sx={{ mb: 2 }} variant="h6">Qual o tipo do seu imóvel?</Typography>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={type.options}
                    sx={{ width: 300 }}
                    value={type.value}
                    onChange={(e, value) => type.onChange(value)}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="Tipo" />}
                    renderOption={(props, option) => <Box component={'li'} {...props}>{option.name}</Box>}
                />
            </Box>

            {/* Qual o endereço do imóvel? */}
            <Box sx={{ width: 'fit-content', mb: 5 }}>
                <Typography sx={{ mb: 2 }} variant="h6">Qual o endereço do imóvel?</Typography>

                <Box sx={{
                    display: 'flex',
                    gap: 2,
                    mb: 3
                }}>
                    <TextField
                        id="outlined-basic"
                        label="Cep"
                        variant="outlined"
                        value={zipcode.value}
                        onChange={(e) => zipcode.onChange(e)}
                    />
                    <Button variant="text">Não sei meu CEP</Button>
                </Box>

                <Box sx={{
                    display: 'flex',
                    gap: 2,
                    mb: 3
                }}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={state.options}
                        sx={{ width: 300 }}
                        value={state.value}
                        onChange={(e, value) => state.onChange(value)}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} label="Estado" />}
                        renderOption={(props, option) => <Box component={'li'} {...props}>{option.name}</Box>}
                    />
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={city.options}
                        sx={{ width: 300 }}
                        value={city.value}
                        onChange={(e, value) => city.onChange(value)}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} label="Cidade" />}
                        renderOption={(props, option) => <Box component={'li'} {...props}>{option.name}</Box>}
                    />
                </Box>
                <Box sx={{
                    display: 'flex',
                    gap: 2,
                    mb: 3
                }}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={district.options}
                        sx={{ width: 300 }}
                        value={district.value}
                        onChange={(e, value) => district.onChange(value)}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} label="Bairro" />}
                        renderOption={(props, option) => <Box component={'li'} {...props}>{option.name}</Box>}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Rua"
                        variant="outlined"
                        sx={{ width: 300 }}
                        value={route.value}
                        onChange={(e) => route.onChange(e)}
                    />
                </Box>
                <Box sx={{
                    display: 'flex',
                    gap: 2
                }}>
                    <TextField
                        id="outlined-basic"
                        type={"number"}
                        label="Número"
                        variant="outlined"
                        value={number.value}
                        onChange={(e) => number.onChange(e)}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Complemento"
                        variant="outlined"
                        fullWidth
                        value={complement.value}
                        onChange={(e) => complement.onChange(e)}
                    />
                </Box>
            </Box>

            {/* Dados do imóvel */}
            <Box sx={{ width: 'fit-content', mb: 5 }}>
                <Typography
                    sx={{ mb: 2 }}
                    variant="h6"
                >
                    Dados do imóvel
                </Typography>
                <Box sx={{
                    display: 'flex',
                    gap: 2,
                    mb: 3
                }}>
                    <TextField
                        id="outlined-basic"
                        label="Área útil"
                        variant="outlined"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">m²</InputAdornment>,
                        }}
                        value={usefulArea.value}
                        onChange={(e) => usefulArea.onChange(e)}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Área total"
                        variant="outlined"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">m²</InputAdornment>,
                        }}
                        value={totalArea.value}
                        onChange={(e) => totalArea.onChange(e)}
                    />
                </Box>
            </Box>

            {/* Descrição */}
            <Box sx={{ width: 'fit-content', mb: 5 }}>
                <TextField
                    id="outlined-multiline-static"
                    label="Descrição"
                    multiline
                    rows={4}
                    sx={{ width: 300 }}
                    value={description.value}
                    onChange={(e) => description.onChange(e)}
                />
            </Box>

            {/* Qual o valor do seu imóvel */}
            <Box sx={{ width: 'fit-content', mb: 5 }}>
                <Typography
                    sx={{ mb: 2 }}
                    variant="h6"
                >
                    Qual o valor do seu imóvel
                </Typography>
                <Box sx={{
                    display: 'flex',
                    gap: 2,
                    mb: 3
                }}>
                    <TextField
                        id="outlined-basic"
                        label="Valor"
                        variant="outlined"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                        }}
                        value={price.value}
                        onChange={(e) => price.onChange(e)}
                    />
                </Box>
                <Box sx={{
                    display: 'flex',
                    gap: 2,
                    mb: 3
                }}>
                    <TextField
                        id="outlined-basic"
                        label="IPTU"
                        variant="outlined"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                        }}
                        value={iptu.value}
                        onChange={(e) => iptu.onChange(e)}
                    />
                    <FormControlLabel control={<Checkbox />} label="Isento" />
                </Box>
            </Box>
        </Box>
    )
}