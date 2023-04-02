import { Box } from "@mui/material";
import {styled} from "@mui/material/styles";

export const GalleryContainer = styled(Box)`
    display: flex;
    flex: 1;
    gap: .5rem;
`
export const ImageSelected = styled(Box)`
    flex: 1;
    height: 100%;
    background: #000;
    border-radius: 8px;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`
export const Thumbns = styled(Box)`
    width: 100px;
    height: 100%;

    display: flex;
    flex-direction: column;
    gap: .5rem;
    border-radius: 8px;
`
export const Thumb = styled(Box)`
    width: 100px;
    max-height: 100px;
    flex: 1;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
    cursor: pointer;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`
export const ButtonPlus = styled(Box)`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    height: 100%;
    width: 100%;
    border-radius: 4px;

    background: rgba(0, 0, 0, .5);
    color: #fff;

    display: flex;
    align-items: center;
    justify-content: center;
`