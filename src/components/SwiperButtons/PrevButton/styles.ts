import {Button as ButtonMui, styled} from "@mui/material";

export const Button = styled(ButtonMui)`
    width: 32px;
    min-width: 32px;
    height: 32px;
    border: 0; 
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({theme}) => theme.palette.primary.main};
    svg {
        color: #fff;
        font-size: 24px;
    }
    &:disabled {
        background: ${({theme}) => theme.palette.grey[300]};
        svg {
            color: ${({theme}) => theme.palette.grey[700]};
        }
    }
`