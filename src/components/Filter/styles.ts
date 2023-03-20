import { Box, styled } from "@mui/material";

export const FilterContainer = styled(Box)`
    width: 100%;
    height: auto;
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