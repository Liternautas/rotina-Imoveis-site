import { Button, Box } from "@mui/material";
import {styled} from "@mui/material/styles";

export const ContentWrapper = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    max-width: 500px;
    background: #fff;
    box-shadow: 24;
    border-radius: 8px;
    padding: 16px;
    padding-top: 24px;
    max-height: 80vh;
    overflow: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
export const Content = styled(Box)`
    margin: 16px 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
`
export const Footer = styled(Box)`
    display: flex;
    flex: 1;
    align-items: flex-end;
    gap: 16px;
`

interface ItemProps {
    active: boolean;
}
export const Item = styled(Button) <ItemProps>`
    display: flex;
    flex-direction: column;

    border: 1px solid ${({ theme, active }) => active ? theme.palette.primary.main : '#aaa'};
    color: ${({ theme, active }) => active ? theme.palette.primary.main : '#aaa'};
`