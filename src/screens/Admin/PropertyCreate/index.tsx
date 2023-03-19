import { useEffect, useState } from "react";

import { Container, Box, Stepper, StepButton, Step, Button, Typography, Autocomplete, TextField, FormControl, Select, MenuItem, InputLabel, InputAdornment, FormControlLabel, Checkbox } from "@mui/material";
import { About } from "@/src/components/StepsCreateProperty/About";
import { Gallery } from "@/src/components/StepsCreateProperty/Gallery";
import { Details } from "@/src/components/StepsCreateProperty/Details";
import { useProperty } from "@/src/contexts/PropertyContext";
import { Finished } from "@/src/components/StepsCreateProperty/Finished";

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
    'Detalhes',
    'Galeria',
    'Finalizar'
]

export function PropertyCreate({details}) {
    const {create, setDetails} = useProperty();
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState<{
        [k: number]: boolean;
    }>({});


    const handleStep = (step: number) => () => {
        setActiveStep(step);
    };

    useEffect(() => {
        if(details) {
            setDetails(details);
        }
    }, [details]);

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

            {
                activeStep === 0 &&
                <About />
            }
            {
                activeStep === 1 &&
                <Details />
            }
            {
                activeStep === 2 &&
                <Gallery />
            }
            {
                activeStep === 3 &&
                <Finished />
            }

            {/* Actions */}
            <Box sx={{
                display: 'flex',
                gap: 2,
                mb: 3
            }}>
                <Button
                    type="submit"
                    variant="outlined"
                    disabled={activeStep === 0 ? true : false}
                    sx={{ mt: 3, mb: 2, fontWeight: 500, height: 48 }}
                    onClick={() => {
                        {activeStep > 0 && setActiveStep(activeStep - 1)}
                    }}
                >
                    Voltar
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2, background: '#daa520', color: '#fff', fontWeight: 500, height: 48 }}
                    onClick={async () => {
                        activeStep === 0 && setActiveStep(1);
                        activeStep === 1 && await create().then(res => setActiveStep(2)); 
                    }}
                >
                    Próximo
                </Button>
            </Box>
        </Container>
    )
}