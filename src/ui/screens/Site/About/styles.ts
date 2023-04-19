import { Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Title = styled(Typography)`
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 16px;
    position: relative;
    width: fit-content;

    ::before {
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
export const Section = styled(Box)`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;

    img {
        max-width: 100%;
    }

    @media (max-width: 720px) {
        > div {
            align-items: flex-start;
        }
    }
`