import { useState } from "react";
import { useTheme } from "@mui/material/styles";

//styled-components
import { Box, Toolbar, IconButton, Typography, Divider, List, Button } from "@mui/material";

//icons
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import GridViewIcon from '@mui/icons-material/GridView';
import { ArrowRight, DocumentScannerOutlined, HomeOutlined, LanguageOutlined, ManageAccountsOutlined, Paid, PaidOutlined, PermContactCalendar, PermContactCalendarOutlined, PersonOutline } from "@mui/icons-material";

//styles
import { AppBar, DrawerHeader, DrawerMobile, Drawer } from "./styles";
import { AsideButton } from "../AsideButton";
import { UserAvatar } from "../UserAvatar";
import { AsideButtonCollapse } from "../AsideButtonCollapse";
import { useAuth } from "@/src/contexts/AuthContext";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import Logo from "../../../../public/logo.svg";


export function Aside({ children }) {
    const { user, signOut } = useAuth();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const Content = () => {
        return (
            <>
                <DrawerHeader>
                    {open && <Box sx={{
                        flexGrow: 1,
                        px: 2.5
                    }}>
                        {open &&
                            <Link href={'/'} style={{
                                display: 'flex',
                                height: 40
                            }}>
                                <Image src={Logo} alt="" quality={100} style={{ height: 40, width: 'fit-content' }} />
                            </Link>
                        }
                    </Box>}
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <AsideButton
                        link='/admin'
                        onPress={() => router.push('/admin')}
                        text={"Dashboard"}
                        Icon={GridViewIcon}
                        open={open}
                    />
                </List>
                <Divider />
                <List>
                    {/* <AsideButton
                        link='/admin/deals'
                        onPress={() => router.push('/admin/deals')}
                        text={"Negócios"}
                        Icon={PaidOutlined}
                        open={open}
                    /> */}
                    <AsideButton
                        link='/admin/properties'
                        onPress={() => router.push('/admin/properties')}
                        text={"Imóveis"}
                        Icon={HomeOutlined}
                        open={open}
                    />
                    <AsideButtonCollapse
                        text={"Usuários"}
                        Icon={PersonOutline}
                        open={open}
                        onEnvet={handleDrawerOpen}
                    >
                        <AsideButton
                            link='/admin/collaborators'
                            onPress={() => router.push('/admin/collaborators')}
                            text={"Colaboradores"}
                            Icon={ArrowRight}
                            open={open}
                        />
                        <AsideButton
                            link='/admin/owners'
                            onPress={() => router.push('/admin/owners')}
                            text={"Proprietários"}
                            Icon={ArrowRight}
                            open={open}
                        />
                        <AsideButton
                            link='/admin/customers'
                            onPress={() => router.push('/admin/customers')}
                            text={"Clientes"}
                            Icon={ArrowRight}
                            open={open}
                        />
                    </AsideButtonCollapse>

                    <AsideButton
                        link='/admin/leads'
                        onPress={() => router.push('/admin/leads')}
                        text={"Leads"}
                        Icon={PermContactCalendarOutlined}
                        open={open}
                    />
                    <AsideButtonCollapse
                        text={"Gerenciamento do site"}
                        Icon={LanguageOutlined}
                        open={open}
                        onEnvet={handleDrawerOpen}
                    >
                        <AsideButton
                            text={"Configurações do site"}
                            Icon={ArrowRight}
                            open={open}
                        />
                        <AsideButton
                            text={"Páginas do site"}
                            Icon={ArrowRight}
                            open={open}
                        />
                        <AsideButton
                            link='/admin/banners'
                            onPress={() => router.push('/admin/banners')}
                            text={"Banners do site"}
                            Icon={ArrowRight}
                            open={open}
                        />
                        <AsideButton
                            text={"Menus do site"}
                            Icon={ArrowRight}
                            open={open}
                        />
                    </AsideButtonCollapse>
                    <AsideButtonCollapse
                        text={"Contratos"}
                        Icon={DocumentScannerOutlined}
                        open={open}
                        onEnvet={handleDrawerOpen}
                    >
                        <AsideButton
                            link='/admin/contracts/sales'
                            text={"Contratos de venda"}
                            Icon={ArrowRight}
                            open={open}
                            onPress={() => router.push('/admin/contracts/sales')}
                        />
                        <AsideButton
                            link='/admin/contracts/rentals'
                            text={"Contratos de locação"}
                            Icon={ArrowRight}
                            open={open}
                            onPress={() => router.push('/admin/contracts/rentals')}
                        />
                        <AsideButton
                            link='/admin/contracts/boletos'
                            text={"Boletos"}
                            Icon={ArrowRight}
                            open={open}
                            onPress={() => router.push('/admin/contracts/boletos')}
                        />
                    </AsideButtonCollapse>
                </List>
            </>
        )
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" open={open}>
                <Toolbar sx={{
                    paddingLeft: '20px !important',
                    paddingRight: '20px !important'
                }}>
                    <Button
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        sx={{
                            marginRight: 2.5,
                            px: 0,
                            color: '#fff',
                            minWidth: 0,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </Button>
                    <Box style={{
                        flexGrow: 1
                    }}>
                        {!open && <Typography variant="h6" noWrap component="div" sx={{ color: '#fff' }}>
                            Imobiliária
                        </Typography>}
                    </Box>
                    <UserAvatar user={user} />
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open} PaperProps={{
                elevation: 16,
                style: {
                }
            }}>
                <Content />
            </Drawer>
            <DrawerMobile
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
                <Content />
            </DrawerMobile>
            <Box component="main" sx={{ flexGrow: 1, p: {
                xs: '24px 0',
                md: 3
            }, overflowY: 'auto', background: `#fafafa`, minHeight: '100vh' }}>
                <DrawerHeader />
                {children}
            </Box>
        </Box>
    )
}

