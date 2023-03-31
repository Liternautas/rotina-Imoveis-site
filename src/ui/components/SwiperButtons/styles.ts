import {Box, styled} from "@mui/material";

export const ButtonGroup = styled(Box)`
    width: fit-content;
    padding: 6px;
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0 auto;
    margin-top: 16px;
    @media (max-width: 1312px) {
        right: 1rem;
    }
`