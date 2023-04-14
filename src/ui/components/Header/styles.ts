import { AppBar as AppBarMui, Drawer as MuiDrawer, Link, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export const AppBar = styled(AppBarMui)`
    box-shadow: 0 0 4px rgba(0, 0, 0, .15);

    img {
        height: 100%;
        object-fit: contain;
        width: fit-content;
        margin-right: 1rem;
    }

    a {
        text-decoration: none;
        font-weight: 500;
        color: #2a2a2a;
        transition: .2s;

        :hover {
            color: ${({ theme }) => theme.palette.primary.main};
        }
    }
`
export const DrawerMobile = styled(MuiDrawer)`
    a {
        color: #2a2a2a;
    }

    @media (min-width: 1080px) {
        display: none;
    }
`
interface PropsLink {
    active?: boolean;
}

export const LinkItem = styled(Link) <PropsLink>`
    color: ${({ theme, active }) => active && theme.palette.primary.main} !important;
    font-weight: 600 !important;
`
export const ButtonCustomer = styled(Button)`
    background: ${({theme}) => theme.palette.secondary.main};
    color: #fff;
    height: 48px;

    :hover {
        background: ${({theme}) => theme.palette.secondary.dark};
    }
`