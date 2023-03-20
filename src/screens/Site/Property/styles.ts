import { Box, styled, Typography } from "@mui/material";

export const Title = styled(Typography)`
    font-size: 24px;
    font-weight: 600;
`
export const Subtitle = styled(Typography)`
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 1rem;
`
export const Description = styled(Typography)`
    font-size: 16px;
    font-weight: 300;
    margin: 1rem 0;
`
export const Aside = styled(Box)`
    position: sticky;
    top: 88px;
    width: 100%;
    min-height: 400px;
    box-shadow: 0 0 4px rgba(0, 0, 0, .15);
    background: #fff;
    border-radius: 8px;
    padding: 1rem;
`