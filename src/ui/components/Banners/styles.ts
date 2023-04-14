import { Typography, Container as ContainerMui, Box } from "@mui/material";
import { styled } from "@mui/material/styles";


export const Container = styled(Box)`
    width: 100%;
    min-height: 496px;
    min-height: 80vh;
    position: relative;

    display: flex;
    flex-direction: column;
    background: rgba(0, 0, 0, .5);
    @media (max-width: 720px) {
        background: #fff;
        height: auto;
    }
`
export const BackgroundHome = styled(Box)`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;

    width: 100%;
    height: 100%;
    background: url(/banner02.jpg);
    background-size: cover;

    @media (max-width: 720px) {
        display: none;
    }
`
export const Title = styled(Typography)`
    font-size: 48px;
    font-weight: 700;
    max-width: 790px;
    margin-bottom: 32px;
    color: #fff;
    text-align: center;
    span {
        color: ${({theme}) => theme.palette.primary.main};
    }
    @media (max-width: 720px) {
        font-size: 24px;
        color: #121212;
    }
`
export const Form = styled(Box)`
    width: 100%;
    max-width: 400px;
    min-height: 200px;
    padding: 12px;
    background: #fff;
    border-radius: 8px;

    display: flex;
    flex-direction: column;
    gap: 1.5rem; 

    @media (max-width: 720px) {
        padding: 0;
    }
`