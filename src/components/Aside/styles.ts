import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MuiDrawer, { DrawerProps as MuiDraweProps } from '@mui/material/Drawer';
import { css } from 'styled-components';
import { Css } from '@mui/icons-material';

const drawerWidth = 300;

export const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

export interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

export interface DrawerProps extends MuiDraweProps {
    open?: boolean;
}

export const AppBar = styled(MuiAppBar) <AppBarProps>`
    z-index: ${({ theme }) => theme.zIndex.drawer + 1};
    @media (min-width: 1080px) {
        width: ${({ open }) => open ? `calc(100% - ${drawerWidth}px)` : `100vw`};
        //transition: .2s;
    }
`

export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' }) <DrawerProps>`
    width: ${({ theme, open }) => open ? `${drawerWidth}px` : `calc(${theme.spacing(7)} + 1px)`};
    transition: .2s;
    & .MuiDrawer-paper {
        width: ${({ theme, open }) => open ? `${drawerWidth}px` : `fit-content`};
    } 
    @media (max-width: 1080px) {
        display: none;
    }
`

export const DrawerMobile = styled(MuiDrawer)`
    @media (min-width: 1080px) {
        display: none;
    }
`