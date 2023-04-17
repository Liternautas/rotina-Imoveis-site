import { useAuth } from "@/src/contexts/AuthContext";
import { useForm } from "@/src/hooks/useForm";
import { Container, Box, Typography, TextField, Button } from "@mui/material";

export function ResetPassword() {
    const {resetPassword} = useAuth();
    const password = useForm();
    const repeat = useForm();

    const handleSubmit = async () => {
        await resetPassword(password.value, repeat.value);
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
                <Typography variant="h1" sx={{ fontSize: 24, fontWeight: 600 }}>Redefinir senha</Typography>
                <Box sx={{mt: 2}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Nova senha"
                        name="email"
                        autoFocus
                        InputLabelProps={{
                            shrink: true
                        }}
                        value={password.value}
                        onChange={e => password.setValue(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Confirmar senha"
                        name="email"
                        autoFocus
                        InputLabelProps={{
                            shrink: true
                        }}
                        value={repeat.value}
                        onChange={e => repeat.setValue(e.target.value)}
                    />
                    <Button variant="contained" fullWidth sx={{
                        height: 48,
                        color: '#fff',
                        fontWeight: 600,
                        mt: 2
                    }} onClick={handleSubmit}>Redefinir senha</Button>
                </Box>
            </Box>
        </Container>
    )
}