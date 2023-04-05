import {Box} from "@mui/material";
import { styled } from "@mui/material/styles";

export const Content = styled(Box)`
    position: fixed;
    left: auto;
    right: auto;
    bottom: 16px;
    background: ${({theme}) => theme.palette.secondary.main};
    z-index: 9999;
    width: 100%;
    max-width: 1152px;

    display: flex;
    flex-direction: column;
    align-items: flex-end;

    padding: 16px;
    border-radius: 8px;
    color: #fff;
    box-shadow: 0 0 8px rgba(0,0, 0, .2);
    
    button {
        font-weight: 600;
        background: ${({theme}) => theme.palette.secondary.light};
        color: #fff;

        :hover {
            background: ${({theme}) => theme.palette.secondary.dark};
        }
    }
`