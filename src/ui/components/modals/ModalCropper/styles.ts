import {Box, Button, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";

export const Container = styled(Box)`
    position: fixed;
    top: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, .5);

    padding: 1rem;
    z-index: 9999;
`
export const Modal = styled(Box)`
    width: 500px;
    max-width: 100%;

    background: #fff;
    padding: 12px;
    border-radius: 6px;
`
export const ModalHeader = styled(Box)`
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
`
export const ModalBody = styled(Box)`

`
export const ModalFooter = styled(Box)`
    display: flex;
    justify-content: flex-end;

    margin-top: 12px;
`
export const CropperContainer = styled(Box)`
    position: relative;
    width: 100%;
    height: 400px;
`
export const ButtonClose = styled(Button)`
    width: 32px;
    height: 32px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 6px;
    border: 0;

    background: ${({theme}) => theme.palette.grey[500]};
    color: ${({theme}) => theme.palette.grey[100]};
`
export const ButtonSubmit = styled(Button)`
    height: 40px;
    padding: 0 2rem;
    border-radius: 6px;
    border: 0;

    font-size: 14px;
    font-weight: 500;
    color: #fff;
    background: ${({theme}) => theme.palette.primary.main};
`
export const Title = styled(Typography)`

`