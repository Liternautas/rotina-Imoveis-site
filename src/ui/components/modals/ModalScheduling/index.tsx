import { useUser } from "@/src/contexts/UserContext";
import { useForm } from "@/src/hooks/useForm";
import { Close } from "@mui/icons-material";
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Content, ContentWrapper, Footer, Item } from "./styles";

const times = [
    {
        id: 1,
        name: '08h'
    },
    {
        id: 2,
        name: '09h'
    },
    {
        id: 3,
        name: '10h'
    },
    {
        id: 4,
        name: '11h'
    },
    {
        id: 5,
        name: '12h'
    },
    {
        id: 6,
        name: '13h'
    },
    {
        id: 7,
        name: '14h'
    },
    {
        id: 8,
        name: '15h'
    },
    {
        id: 9,
        name: '16h'
    },
    {
        id: 10,
        name: '17h'
    },
]
const days = [
    {
        id: 1,
        name: '30',
        text: 'QUI.'
    },
    {
        id: 2,
        name: '31',
        text: 'SEX.'
    },
    {
        id: 3,
        name: '01',
        text: 'SAB.'
    },
    {
        id: 4,
        name: '02',
        text: 'DOM.'
    },
    {
        id: 5,
        name: '03',
        text: 'SEG.'
    },
    {
        id: 6,
        name: '04',
        text: 'TER.'
    },
    {
        id: 7,
        name: '05',
        text: 'QUA.'
    },
]

export function ModalScheduling() {
    const [step, setStep] = useState(0);
    const [day, setDay] = useState(0);
    const [time, setTime] = useState(0);
    const { create } = useUser();

    const email = useForm();
    const name = useForm();
    const phone = useForm('phone');

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = async () => {
        handleClose();
    }

    useEffect(() => {
        setStep(0);
        name.setValue('');
        email.setValue('');
        phone.setValue('');
    }, [open]);

    return (
        <>
            <Button
                onClick={handleOpen}
                variant="outlined"
                sx={{
                    fontWeight: 600,
                    height: 48
                }}
            >
                Agendar visita
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <ContentWrapper>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start'
                    }}>
                        <Box>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Quando você quer visitar o imóvel com um especialista?
                            </Typography>
                            <Typography id="modal-modal-title" variant="subtitle1" component="span">
                                Informamos a localização exata do imóvel na confirmação da visita
                            </Typography>
                        </Box>
                        <IconButton onClick={() => setOpen(false)}>
                            <Close />
                        </IconButton>
                    </Box>
                    {step === 0 ?
                        <Content>
                            <Box sx={{ mb: 1 }}>
                                <Typography sx={{ mb: .8 }} variant="subtitle1">Selecione um dia</Typography>
                                <Box sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 1
                                }}>
                                    {
                                        days.map(item => (
                                            <Item
                                                active={day === item.id}
                                                onClick={() => setDay(item.id)}>
                                                <strong>{item.name}</strong>
                                                <span>{item.text}</span>
                                            </Item>
                                        ))
                                    }
                                </Box>
                            </Box>
                            <Box sx={{ mb: 1 }}>
                                <Typography sx={{ mb: .8 }} variant="subtitle1">Selecione um horário</Typography>
                                <Box sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 1
                                }}>
                                    {
                                        times.map(item => (
                                            <Item
                                                active={time === item.id}
                                                onClick={() => setTime(item.id)}>
                                                <strong>{item.name}</strong>
                                            </Item>
                                        ))
                                    }
                                </Box>
                            </Box>
                        </Content>
                        :
                        <Content>
                            <TextField id="outlined-basic" label="Nome*" variant="outlined" />
                            <TextField id="outlined-basic" label="Telefone*" variant="outlined" />
                            <TextField id="outlined-basic" label="Email*" variant="outlined" />
                        </Content>
                    }
                    <Footer>
                        <Box sx={{
                            flex: 1
                        }}>

                        </Box>
                        {step === 1 && <Button
                            onClick={() => {
                                step === 1 ? setStep(0) : handleSubmit()
                            }}
                            variant="outlined"
                            sx={{
                                fontWeight: 600
                            }}
                        >
                            Voltar
                        </Button>}
                        <Button
                            onClick={() => {
                                step === 0 ? setStep(1) : handleSubmit()
                            }}
                            variant="contained"
                            sx={{
                                color: "#fff",
                                fontWeight: 600
                            }}
                        >
                            Continuar
                        </Button>
                    </Footer>
                </ContentWrapper>
            </Modal>
        </>
    )
}