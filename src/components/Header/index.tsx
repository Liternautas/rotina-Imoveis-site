import { Box, Button, Container, Toolbar } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

import Logo from "../../../public/logo.png"
import { AppBar } from "./styles";

export function Header() {
    return (
        <AppBar position="fixed" sx={{
            background: '#fff'
        }}>
            <Container>
                <Toolbar sx={{
                    p: '0 !important'
                }}>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 3
                    }}>
                        <Image src={Logo} alt="" style={{
                            height: 52,
                            width: 96
                        }} />
                        <Link href={'/'}>Início</Link>
                        <Link href={'/'}>Alugar</Link>
                        <Link href={'/'}>Comprar</Link>
                        <Link href={'/'}>Descobrir</Link>
                        <Link href={'/'}>Financiamento</Link>
                    </Box>
                    <Box sx={{
                        flexGrow: 1,
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}>
                        <Button variant="outlined">Area do cliente</Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}