import { Box, Typography, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Title = styled(Typography)`
    font-size: 24px;
    font-weight: 600;
`
export const Subtitle = styled(Typography)`
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 1rem;
`
export const Description = styled(Typography)`
    font-size: 16px;
    font-weight: 300;
    margin: 1rem 0;
`
export const Aside = styled(Box)`
    position: sticky;
    top: 88px;
    width: 100%;
    height: fit-content;
    box-shadow: 0 0 4px rgba(0, 0, 0, .15);
    background: #fff;
    border-radius: 8px;
    padding: 1rem;
`
export const Footer = styled(Box)`
    width: 100vw;
    height: 72px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    box-shadow: 0 -1px 4px rgba(0, 0, 0, .1);
    background: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 99;

    padding: 1rem;

    button {
        height: 100%;
    }

    @media (min-width: 720px) {
        display: none;
    }
`
export const GridItem = styled(Grid)`
    padding: 8px !important;

    span {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        background: #eee;
        border-radius: 6px;
        color: #1d1d1d;
        font-weight: 600;
    }
`