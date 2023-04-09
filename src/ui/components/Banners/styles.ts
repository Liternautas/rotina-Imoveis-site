import { Typography, Container as ContainerMui, Box } from "@mui/material";
import { styled } from "@mui/material/styles";


export const Container = styled(ContainerMui)`
    width: 100%;
    min-height: 496px;
    height: auto;
    padding-bottom: 1.5rem;
    padding-top: 1.5rem;
    position: relative;

    display: flex;
    flex-direction: column;
`
export const BackgroundHome = styled(Box)`
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;

    width: 100%;
    height: 100%;
    background: url(/banner.png);
    background-size: cover;
    border-radius: 16px;

    @media (max-width: 720px) {
        display: none;
    }
`
export const Title = styled(Typography)`
    font-size: 48px;
    font-weight: 700;
    max-width: 790px;
    margin-bottom: 32px;
    span {
        color: ${({theme}) => theme.palette.primary.main};
    }
    @media (max-width: 720px) {
        font-size: 24px;
        text-align: center;
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