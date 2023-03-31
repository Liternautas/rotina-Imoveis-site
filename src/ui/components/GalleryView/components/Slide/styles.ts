import {styled, Box} from "@mui/material";

export const Container = styled(Box)`
    overflow: hidden;
    display: flex;
    justify-content: center;
    width: 100%;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`