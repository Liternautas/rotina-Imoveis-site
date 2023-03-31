import {Box, IconButton} from "@mui/material";
import {styled} from "@mui/material/styles";

export const Container = styled(Box)`
    height: 100vh;
    width: 100vw;
    background: #000000f0;
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;
`
export const ButtonClose = styled(IconButton)`
    z-index: 99999;
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
    height: 32px;
    width: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    border-radius: 6px;
    background: red;
    cursor: pointer;
    svg {
        color: #fff;
        font-size: 1.125rem;
    }
    :hover {
        background: red;
    }
`