import { Typography } from "@mui/material";
import {styled} from "@mui/material/styles";

export const Title = styled(Typography)`
    font-size: 1.5rem;
    font-weight: 700;
    width: fit-content;
    margin: 0 auto;
    margin-bottom: 36px;
    text-align: center;

    ::after {
        content: '';
        position: absolute;
        left: calc(50% - 50px);
        bottom: -12px;
        height: 4px;
        border-radius: 4px;
        width: 100px;
        background: ${({theme}) => theme.palette.primary.main};
    }
`