import { Typography } from "@mui/material";
import {styled} from "@mui/material/styles";

export const Title = styled(Typography)`
    font-size: 1.5rem;
    font-weight: 700;
    position: relative;
    width: fit-content;
    text-align: center;

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
export const Subtitle = styled(Typography)`
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 16px;
    text-align: center;
`