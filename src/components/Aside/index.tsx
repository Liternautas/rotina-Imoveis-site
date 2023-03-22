import { useState } from "react";
import { useTheme } from "@mui/material/styles";

//styled-components
import { Box, Toolbar, IconButton, Typography, Divider, List, Tooltip, Avatar, Collapse, Button } from "@mui/material";

//icons
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';
import GridViewIcon from '@mui/icons-material/GridView';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonIcon from '@mui/icons-material/Person';
import LanguageIcon from '@mui/icons-material/Language';
import { ArrowRight, DocumentScannerOutlined, HomeOutlined, LanguageOutlined, ManageAccountsOutlined, Paid, PaidOutlined, PersonOutline } from "@mui/icons-material";

//styles
import { AppBar, DrawerHeader, DrawerMobile, Drawer } from "./styles";
import { AsideButton } from "../AsideButton";
import { UserAvatar } from "../UserAvatar";
import { AsideButtonCollapse } from "../AsideButtonCollapse";
import { useAuth } from "@/src/contexts/AuthContext";
import { useRouter } from "next/router";

export function Aside({ children }) {
    const { user } = useAuth();
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
                        {open && <Typography variant="h6" noWrap component="div">
                            Imobiliária
                        </Typography>}
                    </Box>}
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <AsideButton
                        text={"Dashboard"}
                        Icon={GridViewIcon}
                        open={open}
                    />
                </List>
                <Divider />
                <List>
                    <AsideButton
                        onPress={() => router.push('/admin/deals')}
                        text={"Negócios"}
                        Icon={PaidOutlined}
                        open={open}
                    />
                    <AsideButton
                        onPress={() => router.push('/admin/properties')}
                        text={"Imóveis"}
                        Icon={HomeOutlined}
                        open={open}
                    />
                    <AsideButton
                        onPress={() => router.push('/admin/contracts')}
                        text={"Contratos"}
                        Icon={DocumentScannerOutlined}
                        open={open}
                    />
                    <AsideButton
                        onPress={() => router.push('/admin/collaborators')}
                        text={"Colaboradores"}
                        Icon={ManageAccountsOutlined}
                        open={open}
                    />
                    <AsideButton
                        onPress={() => router.push('/admin/customers')}
                        text={"Clientes"}
                        Icon={PersonOutline}
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
                            minWidth: 0,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </Button>
                    <Box style={{
                        flexGrow: 1
                    }}>
                        {!open && <Typography variant="h6" noWrap component="div">
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
            <Box component="main" sx={{ flexGrow: 1, p: 3, overflowY: 'auto', background: `#fafafa`, minHeight: '100vh' }}>
                <DrawerHeader />
                {children}
            </Box>
        </Box>
    )
}

