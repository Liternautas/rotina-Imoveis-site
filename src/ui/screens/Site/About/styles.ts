import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Title = styled(Typography)`
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 16px;
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