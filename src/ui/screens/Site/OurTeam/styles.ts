import { Box, Drawer as MuiDrawer } from "@mui/material";
import {styled} from "@mui/material/styles";

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
export const Aside = styled(Box)`
    width: 100%;
    height: fit-content;
    box-shadow: 0 0 4px rgba(0, 0, 0, .15);
    background: #fff;
    border-radius: 8px;
    padding: 1rem;

    display: flex;
    flex-direction: column;
    gap: 1rem;
`