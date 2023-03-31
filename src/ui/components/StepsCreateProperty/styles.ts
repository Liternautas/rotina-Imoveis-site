import { Box } from "@mui/material";
import {styled} from "@mui/material/styles";

export const FormUploadImage = styled(Box)`
    input {
        display: none;
    }
    label {
        display: flex;
        align-items: center;
        justify-content: center;

        background: ${({theme}) => theme.palette.primary.main};
        color: #fff;
        height: 48px;
        width: fit-content;
        padding: 0 2rem;
        border-radius: 6px;

        cursor: pointer;
    }
`