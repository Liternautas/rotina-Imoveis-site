import { useUser } from "@/src/contexts/UserContext";
import { useForm } from "@/src/hooks/useForm";
import { Close } from "@mui/icons-material";
import { Box, Button, IconButton, Modal, TextField, Typography, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { Content, ContentWrapper, Footer, Item } from "./styles";
import { IProperty } from "@/src/interfaces";
import { adTypes } from "@/src/utils/data";
import { findNameInOptions } from "@/src/helpers/functions";
import { maskPrice } from "@/src/helpers/mask";
import { api } from "@/src/services/api";

interface Props {
    property: IProperty;
}

export function ModalContact({ property }: Props) {
    const [step, setStep] = useState(0);
    const { create } = useUser();

    const email = useForm();
    const name = useForm();
    const phone = useForm('phone');
    const message = useForm();
    const [error, setError] = useState(null);

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const generateMessage = () => {
        let message = '';
        let type = property.type;
        let adType = findNameInOptions(property.adType, adTypes);
        if (property) {
            message = `Olá, Gostaria de ter mais informações do imóvel de Cód. ${property.code}; ${type.name} ${adType === 'Venda' ? `à ${adType}` : `para ${adType}`} de R$ ${maskPrice(property.price)} em ${property.address?.district?.name ?? property.address?.city?.name}, que encontrei no seu site. Aguardo seu contato. Obrigado!`
        } else {
            message = `Olá, Gostaria de ter mais informações do imóvel \n`
        }
        return message;
    }

    const generateLink = () => {
        let message = '';
        let linkText = '';
        message = `${generateMessage()} \n`
        message = message + `Nome: ${name.value} \nTelefone: ${phone.value} \nEmail: ${email.value}`
        let text = window.encodeURIComponent(message);
        linkText = `https://api.whatsapp.com/send?phone=${property.pickup ? `55${property.pickup.phone.replace(/[^0-9]/g, '')}` : `55556481680018`}&text=${text}`;

        const link = document.createElement('a');
        link.href = linkText;
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
        document.body.appendChild(link);
        link.click();
    }

    const handleSubmitLead = async () => {
        if (name.validate() && phone.validate() && email.validate() && message.validate()) {
            await api.post('leads', {
                name: name.value,
                email: email.value,
                phone: phone.value,
                message: message.value,
                realtor: {
                    id: property?.pickup?.id ?? null
                },
                property: {
                    id: property?.id ?? null
                }
            }).then(() => {
                generateLink();
                close();
            });
        } else {
            setError('Insira todos os dados.');
        }
    }

    useEffect(() => {
        message.setValue(generateMessage());
    }, []);

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
                    display: {
                        xs: 'none',
                        md: 'flex'
                    },
                    color: '#fff',
                    fontWeight: 600,
                    height: 48
                }}
            >
                Entrar em contato
            </Button>
            <Button
                onClick={handleOpen}
                variant="contained"
                sx={{
                    display: {
                        xs: 'flex',
                        md: 'none'
                    },
                    color: '#fff',
                    fontWeight: 600,
                    height: 48
                }}
            >
                Contato
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
                        <TextField
                            id="name"
                            label="Nome*"
                            variant="outlined"
                            value={name.value}
                            onChange={name.onChange}
                        />
                        <TextField
                            id="phone"
                            label="Telefone*"
                            variant="outlined"
                            value={phone.value}
                            onChange={phone.onChange}
                        />
                        <TextField
                            id="email"
                            label="Email*"
                            variant="outlined"
                            value={email.value}
                            onChange={email.onChange}
                        />
                        <TextField
                            id="message"
                            label="Mensagem*"
                            variant="outlined"
                            multiline
                            rows={4}
                            value={message.value}
                            onChange={message.onChange}
                        />
                        {error && <Alert severity="error">{error}</Alert>}
                    </Content>
                    <Footer>
                        <Box sx={{ flex: 1 }}></Box>
                        <Button
                            onClick={handleSubmitLead}
                            variant="contained"
                            sx={{
                                color: "#fff",
                                fontWeight: 600,
                                height: 40
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