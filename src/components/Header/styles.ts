import { AppBar as AppBarMui } from "@mui/material";
import {styled} from "@mui/material/styles";

export const AppBar = styled(AppBarMui)`
    img {
        margin-right: 1rem;
    }

    a {
        text-decoration: none;
        font-weight: 500;
        color: #2a2a2a;
        transition: .2s;

        :hover {
            color: ${({theme}) => theme.palette.primary.main};
        }
    }
`