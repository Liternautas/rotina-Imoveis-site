import { Box, styled } from "@mui/material";

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
    height: 100px;
    background: yellow;
    border-radius: 4px;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`