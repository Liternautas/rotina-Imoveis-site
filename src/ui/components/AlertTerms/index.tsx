import { useEffect, useState } from "react";
import { Typography, Container, Button } from "@mui/material";
import Link from "next/link";

import { Content } from "./styles";
import { useCookies } from "@/src/hooks/useCookies";

export function AlertTerms() {
    const [show, setShow] = useState(false);
    const cookies = useCookies();

    const handleSetShow = () => {
        cookies.set('imob.alert', "true");
        setShow(true);
    }

    useEffect(() => {
        const { 'imob.alert': alert } = cookies.get();
        if (alert) {
            setShow(alert === "true");
        }
    }, []);
    if(show) {
        return null;
    }

    return (
        <Container sx={{
            position: 'relative'
        }}>
            <Content>
                <Typography>Ao prosseguir, você concorda com a nossa <Link href={'/politica-privacidade'} style={{
                    color: '#fff',
                    fontWeight: 600,
                    textDecoration: 'underline'
                }}>Política de Privacidade</Link> e com o uso dos cookies que nos permitem melhorar nossos serviços e recomendar conteúdos do seu interesse.</Typography>
                <Button variant="contained" onClick={handleSetShow}>Ok, entendi</Button>
            </Content>
        </Container>
    )
}