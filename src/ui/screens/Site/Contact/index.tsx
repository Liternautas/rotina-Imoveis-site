import { Box, Container, TextField, Typography, Button, IconButton } from "@mui/material";
import { Links, Title } from "./styles";
import { useForm } from "@/src/hooks/useForm";
import { FacebookOutlined, Instagram, YouTube } from "@mui/icons-material";

export function Contact() {
    const name = useForm();
    const phone = useForm();
    const message = useForm();
    const email = useForm();
    return (
        <Container sx={{
            mt: '64px',
            py: {
                sx: 0,
                md: 6
            },
            minHeight: '70vh',
            display: 'flex',
            flexDirection: 'column',
            gap: 8
        }}>
            <Box sx={{
                display: 'flex',
                flex: 1,
                gap: 4
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1
                }}>
                    <Title>Contato</Title>
                    <Typography>Entre em contato conosco para mais informações sobre nossos serviços imobiliários. Estamos prontos para ajudá-lo(a) a encontrar a melhor solução para suas necessidades.</Typography>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Nome"
                        placeholder="Entre com o seu nome completo"
                        name="email"
                        InputLabelProps={{
                            shrink: true
                        }}
                        value={email.value}
                        onChange={e => email.setValue(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="phone"
                        label="Telefone"
                        placeholder="Entre com o seu número de telefone"
                        name="email"
                        InputLabelProps={{
                            shrink: true
                        }}
                        value={email.value}
                        onChange={e => email.setValue(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        placeholder="Entre com o seu Email"
                        name="email"
                        InputLabelProps={{
                            shrink: true
                        }}
                        value={email.value}
                        onChange={e => email.setValue(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Mensagem"
                        placeholder="Digite aqui a sua mensagem"
                        name="email"
                        InputLabelProps={{
                            shrink: true
                        }}
                        multiline
                        rows={4}
                        value={email.value}
                        onChange={e => email.setValue(e.target.value)}
                    />
                    <Button variant="contained" sx={{
                        height: 48,
                        fontWeight: 600,
                        color: '#fff'
                    }}>Enviar</Button>
                </Box>
                <Box>
                    <Box sx={{
                        mb: 2
                    }}>
                        <Title>Siga-nos</Title>
                        <Links>
                            <Box sx={{
                                display: "flex",
                                gap: 1
                            }}>
                                <IconButton>
                                    <FacebookOutlined />
                                </IconButton>
                                <IconButton>
                                    <Instagram />
                                </IconButton>
                                <IconButton>
                                    <YouTube />
                                </IconButton>
                            </Box>
                        </Links>
                    </Box>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d780.1202156735515!2d-47.944817809500755!3d-18.170980206848554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94a66672653b5973%3A0xb7cc9f4721d4b83b!2sRotina%20Im%C3%B3veis!5e0!3m2!1spt-BR!2sbr!4v1680715297581!5m2!1spt-BR!2sbr"
                        width="600"
                        height="450"
                        style={{
                            border: 0
                        }}
                        loading="lazy"></iframe>
                </Box>
            </Box>
        </Container>
    )
}