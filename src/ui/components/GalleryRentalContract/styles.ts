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

        border: .5px solid ${({theme}) => theme.palette.primary.main};
        color: ${({theme}) => theme.palette.primary.main};
        height: 48px;
        width: fit-content;
        padding: 0 2rem;
        border-radius: 4px;

        cursor: pointer;
    }
`