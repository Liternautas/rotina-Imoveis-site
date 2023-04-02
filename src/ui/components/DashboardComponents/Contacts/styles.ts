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
export const Row = styled(Box)`
    display: flex;
    justify-content: space-between;
    padding-bottom: .5rem;
    margin-bottom: .5rem;
    border-bottom: 1px solid #ddd;
    :last-child {
        padding-bottom: 0 !important;
        border-bottom: 0 !important;
    }
`
export const ColumnText = styled(Box)`
    display: flex;
    flex-direction: column;

    :last-child {
        align-items: flex-end;
    }
    
    span {
        font-size: 14px;
        font-weight: 400;
        color: ${({ theme }) => theme.palette.grey[700]};
    }
    strong {
        font-size: 14px;
        font-weight: 600;
        color: ${({ theme }) => theme.palette.grey[700]};
    }
`