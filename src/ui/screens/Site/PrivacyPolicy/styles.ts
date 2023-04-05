import { Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Title = styled(Typography)`
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 8px;
    position: relative;
    width: fit-content;

    ::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 4px;
        height: 12px;
        border-radius: 4px;
        width: 100%;
        background: #FFF4D3;
        z-index: -1;
    }
`
export const Links = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: .5rem;

    a {
        text-decoration: none;
        color: #FFF4D3;
        transition: .2s;
        :hover {
            color: ${({theme}) => theme.palette.primary.main};
        }
    }
    button {
        background: #FFF4D3;
        :hover {
            background: ${({theme}) => theme.palette.primary.main};
        }
    }
    svg {
        color: ${({theme}) => theme.palette.primary.main};
    }
`