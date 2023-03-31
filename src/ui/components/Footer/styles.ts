import { Box, styled, Typography } from "@mui/material";

export const Title = styled(Typography)`
    position: relative;
    margin-bottom: 24px;
    ::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 0;
        width: 32px;
        height: 4px;
        border-radius: 4px;
        background: ${({theme}) => theme.palette.primary.main};
    }
`
export const Links = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: .5rem;

    a {
        text-decoration: none;
        color: #899d9d;
        transition: .2s;
        :hover {
            color: ${({theme}) => theme.palette.primary.main};
        }
    }
    button {
        background: #899d9d;
        :hover {
            background: ${({theme}) => theme.palette.primary.main};
        }
    }
    svg {
        color: #fff;
    }
`