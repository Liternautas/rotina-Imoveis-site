import { Box } from "@mui/material";
import {styled} from "@mui/material/styles";

export const Container = styled(Box)`
    flex: 1;
    max-width: 564px;
    padding: .75rem;
    background: #fff;
    box-shadow: 0 4px 4px rgba(0, 0, 0, .15);
    border-radius: 6px;

    h4 {
        font-size: 16px;
        font-weight: 600;
        color: ${({ theme }) => theme.palette.grey[700]};
        margin-bottom: 1rem;
    }
`