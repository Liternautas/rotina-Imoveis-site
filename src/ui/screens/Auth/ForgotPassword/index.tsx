import { useAuth } from "@/src/contexts/AuthContext";
import { useForm } from "@/src/hooks/useForm";
import { Container, Box, Typography, TextField, Button } from "@mui/material";

export function ForgotPassword() {
    const {forgotPassword} = useAuth();
    const email = useForm();

    const handleSubmit = async () => {
        await forgotPassword(email.value);
    }

    return (
        <Container component="main" maxWidth="xs" sx={{ minHeight: '70vh' }}>
            <Box sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                py: 4
            }}>
                <Typography variant="h1" sx={{ fontSize: 24, fontWeight: 600 }}>Recuperação de senha</Typography>
                <Typography variant="h1" sx={{ fontSize: 16, fontWeight: 400, textAlign: 'center', mt: 1 }}>Insira seu endereço de e-mail abaixo para recuperar sua senha e acessar sua conta novamente.</Typography>
                <Box sx={{mt: 2}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoFocus
                        InputLabelProps={{
                            shrink: true
                        }}
                        value={email.value}
                        onChange={e => email.setValue(e.target.value)}
                    />
                    <Button variant="contained" fullWidth sx={{
                        height: 48,
                        color: '#fff',
                        fontWeight: 600,
                        mt: 2
                    }} onClick={handleSubmit}>Recuperar senha</Button>
                </Box>
            </Box>
        </Container>
    )
}