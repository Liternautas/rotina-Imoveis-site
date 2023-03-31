import { Box} from "@mui/material";
import {styled} from "@mui/material/styles";

export const Container = styled(Box)`
    overflow: hidden;
    display: flex;
    justify-content: center;
    width: 100%;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`