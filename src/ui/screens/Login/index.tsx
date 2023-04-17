import { Container, Box, Avatar, Typography, TextField, Button, Grid, Link, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from "@mui/material";
import { LockOutlined as LockOutlinedIcon, Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useForm } from "@/src/hooks/useForm";
import { useAuth } from "@/src/contexts/AuthContext";
import { useState } from "react";

export function Login() {
    const { signIn, signInCustomer } = useAuth();

    const [showPassword, setShowPassword] = useState(false);
    const email = useForm();
    const password = useForm();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        {router.asPath === '/login' ? await signIn(email.value, password.value) : signInCustomer(email.value, password.value)}
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon sx={{color: '#fff'}} />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Typography component="p" variant="inherit" sx={{ mt: 1, mb: 3, textAlign: 'center', fontSize: 14 }}>
                    Ao me logar, aceito os Termos de uso e Política de privacidade da Imobiliária, receber comunicações da Imobiliária e afirmo ter 18 anos ou mais.
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, gap: 2, display: "flex", flexDirection: "column", width: "100%" }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoFocus
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
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        InputLabelProps={{
                            shrink: true
                        }}
                        value={password.value}
                        onChange={e => password.setValue(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, background: '#daa520', color: '#fff', fontWeight: 500, height: 48 }}
                    >
                        Entrar
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="/forgot-password?red=login" variant="body2">
                                Esqueceu sua senha?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Não tem uma conta? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}