import { useState } from "react";

import { Container, Box, Stepper, StepButton, Step, Button, Typography, Autocomplete, TextField, FormControl, Select, MenuItem, InputLabel, InputAdornment, FormControlLabel, Checkbox } from "@mui/material";

const types = [
    {
        "id": 1,
        "name": "Casa",
        "slug": "casa"
    },
    {
        "id": 3,
        "name": "Apartamento",
        "slug": "apartamento"
    },
    {
        "id": 4,
        "name": "Studio",
        "slug": "studio"
    },
    {
        "id": 5,
        "name": "Kitnet",
        "slug": "kitnet"
    },
    {
        "id": 6,
        "name": "Casa de Condomínio",
        "slug": "casa-de-condominio"
    },
    {
        "id": 7,
        "name": "Casa de Vila",
        "slug": "casa-de-vila"
    },
    {
        "id": 8,
        "name": "Cobertura",
        "slug": "cobertura"
    },
    {
        "id": 9,
        "name": "Flat",
        "slug": "flat"
    },
    {
        "id": 10,
        "name": "Loft",
        "slug": "loft"
    },
    {
        "id": 11,
        "name": "Terreno/Lote",
        "slug": "terrenolote"
    },
    {
        "id": 12,
        "name": "Fazenda / Sítio / Chácara",
        "slug": "fazenda-sitio-chacara"
    },
    {
        "id": 13,
        "name": "Ponto Comercial",
        "slug": "ponto-comercial"
    }
]

const steps = [
    'Sobre o imóvel',
    'Galeria',
    'Adicional',
    'Finalizado'
]

export function PropertyCreate() {
    const [value, setValue] = useState(0);
    const [type, setType] = useState(null);
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState<{
        [k: number]: boolean;
    }>({});


    const handleChangeType = (type) => {
        setType(type);
    };

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleStep = (step: number) => () => {
        setActiveStep(step);
    };

    return (
        <Container>
            {/* Steps */}
            <Box sx={{ mb: 6 }}>
                <Stepper nonLinear activeStep={activeStep}>
                    {steps.map((label, index) => (
                        <Step key={label} completed={completed[index]}>
                            <StepButton color="inherit" onClick={handleStep(index)}>
                                {label}
                            </StepButton>
                        </Step>
                    ))}
                </Stepper>
            </Box>


            {/* O que você deseja fazer? */}
            <Box sx={{ mb: 5 }}>
                <Typography sx={{ mb: 2 }} variant="h5">O que você deseja fazer?</Typography>
                <Box sx={{ display: "flex", gap: 2, width: 'fit-content' }}>
                    <Button variant={value === 0 ? "contained" : "outlined"} sx={{ color: value === 0 && '#fff' }} onClick={() => setValue(0)}>Vender</Button>
                    <Button variant={value === 1 ? "contained" : "outlined"} sx={{ color: value === 1 && '#fff' }} onClick={() => setValue(1)}>Alugar</Button>
                </Box>
            </Box>

            {/* Qual o tipo do seu imóvel? */}
            <Box sx={{ width: 300, mb: 5 }}>
                <Typography sx={{ mb: 2 }} variant="h5">Qual o tipo do seu imóvel?</Typography>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                    <Select
                        label="Tipo"
                        value={type}
                        renderValue={(value) => <Box>{value?.name}</Box>}
                    >
                        {types.map(type => <MenuItem value={type.id} onClick={() => setType(type)}>{type.name}</MenuItem>)}
                    </Select>
                </FormControl>
            </Box>

            {/* Qual o endereço do imóvel? */}
            <Box sx={{ width: 'fit-content', mb: 5 }}>
                <Typography sx={{ mb: 2 }} variant="h5">Qual o endereço do imóvel?</Typography>

                <Box sx={{
                    display: 'flex',
                    gap: 2,
                    mb: 3
                }}>
                    <TextField id="outlined-basic" label="Cep" variant="outlined" />
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
                        options={types}
                        sx={{ width: 300 }}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} label="Estado" />}
                        renderOption={(props, option) => <Box component={'li'} {...props}>{option.name}</Box>}
                    />
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={types}
                        sx={{ width: 300 }}
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
                        options={types}
                        sx={{ width: 300 }}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} label="Bairro" />}
                        renderOption={(props, option) => <Box component={'li'} {...props}>{option.name}</Box>}
                    />
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={types}
                        sx={{ width: 300 }}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} label="Rua" />}
                        renderOption={(props, option) => <Box component={'li'} {...props}>{option.name}</Box>}
                    />
                </Box>
                <Box sx={{
                    display: 'flex',
                    gap: 2
                }}>
                    <TextField id="outlined-basic" label="Número" variant="outlined" />
                    <TextField id="outlined-basic" label="Complemento" variant="outlined" fullWidth />
                </Box>
            </Box>

            {/* Dados do imóvel */}
            <Box sx={{ width: 'fit-content', mb: 5 }}>
                <Typography
                    sx={{ mb: 2 }}
                    variant="h5"
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
                        type={'number'}
                        variant="outlined"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">m²</InputAdornment>,
                        }}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Área total"
                        type={'number'}
                        variant="outlined"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">m²</InputAdornment>,
                        }}
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
                />
            </Box>

            {/* Qual o valor do seu imóvel */}
            <Box sx={{ width: 'fit-content', mb: 5 }}>
                <Typography
                    sx={{ mb: 2 }}
                    variant="h5"
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
                        type={'number'}
                        variant="outlined"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                        }}
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
                        type={'number'}
                        variant="outlined"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                        }}
                    />
                    <FormControlLabel control={<Checkbox />} label="Isento" />
                </Box>
                <Box sx={{
                    display: 'flex',
                    gap: 2,
                    mb: 3
                }}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="outlined"
                        disabled={activeStep === 0 ? true : false}
                        sx={{ mt: 3, mb: 2, fontWeight: 500, height: 48 }}
                    >
                        Voltar
                    </Button>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, background: '#daa520', color: '#fff', fontWeight: 500, height: 48 }}
                    >
                        Próximo
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}