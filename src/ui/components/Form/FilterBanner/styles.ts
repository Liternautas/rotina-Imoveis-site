import { Box } from "@mui/material";
import {styled} from "@mui/material/styles"

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