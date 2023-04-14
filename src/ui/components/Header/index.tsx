import { Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import Image from "next/image";
import Link from "next/link";

import Logo from "../../../../public/logo.svg";
import { AppBar, ButtonCustomer, DrawerMobile, LinkItem } from "./styles";
import { useRouter } from "next/router";

export default function Header() {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    return (
        <AppBar position="fixed" sx={{
            background: '#fff'
        }}>
            <Container>
                <Toolbar sx={{
                    height: 72,
                    p: '8px 0 !important',
                    justifyContent: 'space-between'
                }}>
                    <Link href={'/'} style={{
                        display: 'flex',
                        height: 56
                    }}>
                        <Image src={Logo} alt="" quality={100} />
                    </Link>
                    <Box sx={{
                        display: {
                            xs: 'none',
                            md: 'flex'
                        },
                        ml: 2,
                        alignItems: "center",
                        gap: 3
                    }}>
                        <Link href={'/'} title="Início">
                            <LinkItem active={router.asPath === '/'}>
                                Início
                            </LinkItem>
                        </Link>
                        <Link href={'/sobre'} title="Sobre a Rotina Imóveis">
                            <LinkItem active={router.asPath === '/sobre'}>
                                Sobre
                            </LinkItem>
                        </Link>
                        <Link href={'/imoveis/filter?adType=aluguel'} title="Imóveis para alugar">
                            <LinkItem active={router.asPath.startsWith('/imoveis/filter?adType=aluguel')}>
                                Alugar
                            </LinkItem>
                        </Link>
                        <Link href={'/imoveis/filter?adType=venda'} title="Imóveis para comprar">
                            <LinkItem active={router.asPath.startsWith('/imoveis/filter?adType=venda')}>
                                Comprar
                            </LinkItem>
                        </Link>
                        <Link href={'/contato'} title="Entre em contato">
                            <LinkItem active={router.asPath === '/contato'}>
                                Contato
                            </LinkItem>
                        </Link>
                    </Box>
                    <Box sx={{
                        flexGrow: 1,
                        display: {
                            xs: 'none',
                            md: 'flex'
                        },
                        justifyContent: 'flex-end'
                    }}>
                        <ButtonCustomer
                            variant="contained"
                            onClick={() => router.push('/area-do-cliente')}
                        >
                            Area do cliente
                        </ButtonCustomer>
                    </Box>
                    <IconButton
                        sx={{
                            display: {
                                xs: 'flex',
                                md: 'none'
                            }
                        }}
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={() => setOpen(true)}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                    <DrawerMobile
                        anchor="right"
                        variant="temporary"
                        open={open}
                        ModalProps={{
                            style: {
                                zIndex: 9999
                            }
                        }}
                        PaperProps={{
                            style: {
                                width: 300
                            }
                        }}
                        onClose={() => setOpen(false)}
                    >
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3,
                            p: 2
                        }}>
                            <Link href={'/'} title="Início" onClick={() => setOpen(false)}>
                                <LinkItem active={router.asPath === '/'}>
                                    Início
                                </LinkItem>
                            </Link>
                            <Link href={'/sobre'} title="Sobre a Rotina Imóveis" onClick={() => setOpen(false)}>
                                <LinkItem active={router.asPath === '/sobre'}>
                                    Sobre
                                </LinkItem>
                            </Link>
                            <Link href={'/imoveis/filter?adType=aluguel'} title="Imóveis para alugar" onClick={() => setOpen(false)}>
                                <LinkItem active={router.asPath.startsWith('/imoveis/filter?adType=aluguel')}>
                                    Alugar
                                </LinkItem>
                            </Link>
                            <Link href={'/imoveis/filter?adType=venda'} title="Imóveis para comprar" onClick={() => setOpen(false)}>
                                <LinkItem active={router.asPath.startsWith('/imoveis/filter?adType=venda')}>
                                    Comprar
                                </LinkItem>
                            </Link>
                            <Link href={'/contato'} title="Entre em contato" onClick={() => setOpen(false)}>
                                <LinkItem active={router.asPath === '/contato'}>
                                    Contato
                                </LinkItem>
                            </Link>
                        </Box>
                        <Box sx={{
                            flexGrow: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            p: 2
                        }}>
                            <ButtonCustomer
                                variant="contained"
                                onClick={() => router.push('/area-do-cliente')}
                            >
                                Area do cliente
                            </ButtonCustomer>
                        </Box>
                    </DrawerMobile>
                </Toolbar>
            </Container>
        </AppBar>
    )
}