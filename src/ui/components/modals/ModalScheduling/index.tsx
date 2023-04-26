import { useUser } from "@/src/contexts/UserContext";
import { useForm } from "@/src/hooks/useForm";
import { Close } from "@mui/icons-material";
import { Box, Button, Alert, IconButton, Modal, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Content, ContentWrapper, Footer, Item } from "./styles";
import { findDays } from "@/src/helpers/date";
import { ILead, IProperty } from "@/src/interfaces";
import { api } from "@/src/services/api";
import { findNameInOptions } from "@/src/helpers/functions";
import { adTypes } from "@/src/utils/data";
import { maskPrice } from "@/src/helpers/mask";

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

interface Props {
    property: IProperty;
}

export function ModalScheduling({property}: Props) {
    const [step, setStep] = useState(0);
    const [day, setDay] = useState(null);
    const [time, setTime] = useState(null);
    const [error, setError] = useState(null);
    const days = findDays();

    const email = useForm();
    const name = useForm();
    const phone = useForm('phone');
    const message = useForm();

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const generateMessage = () => {
        let message = '';
        let type = property.type;
        let adType = findNameInOptions(property.adType, adTypes);
        if (property) {
            message = `Olá, Gostaria de agendar uma visita no dia ${days[day-1].name} ${days[day-1].enum} - ${times[time].name}, no imóvel de Cód. ${property.code}; ${type.name} ${adType === 'Venda' ? `à ${adType}` : `para ${adType}`} de R$ ${maskPrice(property.price)} em ${property.address?.district?.name ?? property.address?.city?.name}, que encontrei no seu site. Aguardo seu contato. Obrigado!`
        } else {
            message = `Olá, Gostaria de agendar uma visita em um imóvel \n`
        }
        return message;
    }

    const generateLink = () => {
        let message = '';
        let linkText = '';
        message = `${generateMessage()} \n`
        message = message + `Nome: ${name.value} \nTelefone: ${phone.value} \nEmail: ${email.value}`
        let text = window.encodeURIComponent(message);
        linkText = `https://api.whatsapp.com/send?phone=${property.pickup ? `55${property.pickup.phone.replace(/[^0-9]/g, '')}` : `556481680018`}&text=${text}`;

        const link = document.createElement('a');
        link.href = linkText;
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
        document.body.appendChild(link);
        link.click();
    }

    const handleSubmitLead = async () => {
        if (name.validate() && phone.validate() && email.validate()) {
            const [hour] = times[time].name.split('h');
            const date = days[day-1].date;
            date.setHours(Number(hour) - 4, 0, 0, 0);
            const lead: ILead = {
                name: name.value,
                email: email.value,
                phone: phone.value,
                message: message.value,
                date: date,
                time: date,
                type: 'visita'
            }
            await api.post('leads', {
                ...lead,
                realEstate: {
                    id: process.env.NEXT_PUBLIC_REAL_ESTATE_ID
                },
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
        }
    }

    const handleSubmit = async () => {
        switch (step) {
            case 0:
                if (day && time) {
                    setStep(1);
                    { error && setError(null) }
                } else {
                    setError('Insira todos os dados.');
                }
                break;
            case 1:
                if (email.validate() && name.validate() && phone.validate()) {
                    { error && setError(null) }
                    await handleSubmitLead();
                    handleClose();
                } else {
                    setError('Insira todos os dados.');
                }
                break;
        }
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
                                                <span>{item.enum}</span>
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
                            {error && <Alert severity="error">{error}</Alert>}
                        </Content>
                        :
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
                    }
                    <Footer>
                        <Box sx={{
                            flex: 1
                        }}>

                        </Box>
                        {step === 1 && <Button
                            onClick={() => {
                                step === 1 ? setStep(0) : null;
                                setError(null);
                            }}
                            variant="outlined"
                            sx={{
                                fontWeight: 600
                            }}
                        >
                            Voltar
                        </Button>}
                        <Button
                            onClick={handleSubmit}
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