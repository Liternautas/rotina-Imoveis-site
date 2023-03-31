import { Box, styled, Drawer as MuiDrawer } from "@mui/material";

export const Results = styled(Box)`
    width: 100%;
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`
export const DrawerMobile = styled(MuiDrawer)`
    & > div div {
        box-shadow: none;
    } 
    a {
        color: #2a2a2a;
    }

    @media (min-width: 1080px) {
        display: none;
    }
`