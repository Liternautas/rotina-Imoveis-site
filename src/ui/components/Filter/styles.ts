import { Box } from "@mui/material";
import {styled} from "@mui/material/styles";

export const FilterContainer = styled(Box)`
    width: 100%;
    height: fit-content;
    background: #fff;
    box-shadow: 0 0 4px rgba(0, 0, 0, .15);
    border-radius: 8px;
    padding: .75rem;

    display: flex;
    flex-direction: column;
    gap: 1rem;

    position: sticky;
    top: 88px
`