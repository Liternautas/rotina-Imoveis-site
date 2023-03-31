import { useUser } from "@/src/contexts/UserContext";
import { useForm } from "@/src/hooks/useForm";
import { Close } from "@mui/icons-material";
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Content, ContentWrapper, Footer, Item } from "./styles";

export function ModalContact() {
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
                variant="contained"
                sx={{
                    color: '#fff',
                    fontWeight: 600,
                    height: 48
                }}
            >
                Entrar em contato
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
                                Quer saber mais sobre este imóvel?
                            </Typography>
                            <Typography id="modal-modal-title" variant="subtitle1" component="span">
                                Preencha o formulário de contato agora!
                            </Typography>
                        </Box>
                        <IconButton onClick={() => setOpen(false)}>
                            <Close />
                        </IconButton>
                    </Box>
                    <Content>
                        <TextField id="outlined-basic" label="Nome*" variant="outlined" />
                        <TextField id="outlined-basic" label="Telefone*" variant="outlined" />
                        <TextField id="outlined-basic" label="Email*" variant="outlined" />
                        <TextField
                            id="outlined-basic"
                            label="Mensagem*"
                            variant="outlined"
                            multiline
                            rows={4}
                        />
                    </Content>
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