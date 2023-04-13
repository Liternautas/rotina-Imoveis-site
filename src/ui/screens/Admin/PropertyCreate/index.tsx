import { useEffect, useState } from "react";

import { Container, Box, Stepper, StepButton, Step, Button, Typography, Autocomplete, TextField, FormControl, Select, MenuItem, InputLabel, InputAdornment, FormControlLabel, Checkbox } from "@mui/material";
import { About } from "@/src/ui/components/StepsCreateProperty/About";
import { Gallery } from "@/src/ui/components/StepsCreateProperty/Gallery";
import { Details } from "@/src/ui/components/StepsCreateProperty/Details";
import { useProperty } from "@/src/contexts/PropertyContext";
import { Finished } from "@/src/ui/components/StepsCreateProperty/Finished";
import { useRouter } from "next/router";
import { IUser } from "@/src/interfaces";

const steps = [
    'Sobre o imóvel',
    'Detalhes',
    'Galeria',
    'Finalizar'
]

interface Props {
    details, 
    owners?: IUser, 
    realtors?: IUser
}

export function PropertyCreate({details, owners, realtors}: Props) {
    const {create, setDetails, owner, pickup} = useProperty();
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState<{
        [k: number]: boolean;
    }>({});
    const router = useRouter();


    const handleStep = (step: number) => () => {
        setActiveStep(step);
    };

    useEffect(() => {
        if(details) {
            setDetails(details);
        }
    }, [details]);
    
    useEffect(() => {
        if(realtors) {
            pickup.setOptions(realtors);
        }
    }, [realtors]);
    
    useEffect(() => {
        if(owners) {
            owner.setOptions(owners);
        }
    }, [owners]);

    useEffect(() => {
        {router.asPath.startsWith('/admin/properties/update/') && setActiveStep(2)}
    }, []);

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
                        activeStep === 1 && await create(); 
                        activeStep === 2 && setActiveStep(3);
                        activeStep === 3 && await create().then(res => router.push('/admin/properties'));
                    }}
                >
                    {activeStep === 3 ? 'Finalizar' : 'Próximo'}
                </Button>
            </Box>
        </Container>
    )
}