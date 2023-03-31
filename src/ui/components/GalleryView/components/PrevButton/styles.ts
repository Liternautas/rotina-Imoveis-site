import { IconButton} from "@mui/material";
import {styled} from "@mui/material/styles";

export const Button = styled(IconButton)`
    z-index: 99999;
    position: absolute;
    left: 1.5rem;
    width: 32px;
    height: 32px;
    border: 0; 
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({theme}) => theme.palette.primary.main};
    cursor: pointer;
    
    svg {
        color: #fff;
        font-size: 24px;
    }
    :hover {
        background: ${({theme}) => theme.palette.primary.dark};
    }
    &:disabled {
        background: #ddd;
        svg {
            color: #bbb;
        }
    }
`