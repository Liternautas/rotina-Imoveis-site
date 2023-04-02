import { Box } from "@mui/material";
import {styled} from "@mui/material/styles";

export const Container = styled(Box)`
    flex: 1;
    max-width: 564px;
    padding: .75rem;
    background: #fff;
    box-shadow: 0 4px 4px rgba(0, 0, 0, .15);
    border-radius: 6px;

    h4 {
        font-size: 16px;
        font-weight: 600;
        color: ${({ theme }) => theme.palette.grey[700]};
        margin-bottom: 1rem;
    }
`
export const Row = styled(Box)`
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
`
export const ColumnText = styled(Box)`
    display: flex;
    flex-direction: column;

    :last-child {
        align-items: flex-end;
    }
    
    span {
        font-size: 14px;
        font-weight: 400;
        color: ${({ theme }) => theme.palette.grey[700]};
    }
    strong {
        font-size: 14px;
        font-weight: 600;
        color: ${({ theme }) => theme.palette.grey[700]};
    }
`
export const Divider = styled(Box)`
    width: 80%;
    height: 1px;
    background: #ff9100;
    position: absolute;

    ::after {
        content: '';
        position: absolute;
        width: 8px;
        height: 8px;
        border-radius: 6px;
        border: 2px solid #ff9100;
        right: 0;
        top: -5px;
        background: #fff;
    }
`
export const Funnel = styled(Box)`
    width: 100%;
    height: 40px;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    position: relative;

    p {
        width: 80%;
        position: absolute;
        top: 0px;
        text-align: end;
        padding: 0 1.5rem;
        font-size: .75rem;
        font-weight: 500;
        color: ${({ theme }) => theme.palette.grey[700]};
    }

    span {
        display: flex;
        border: 24px solid transparent;
        margin-right: 0;
        height: 0;
        
        border-top: 40px solid!important;
        border-left: 0 solid!important;
        border-bottom: 0 solid!important;
        position: relative;
        border-top-color: #ff9100!important;
    }
    

    :nth-child(1) {
        span {
            width: 180px;
            border-top-color: #DE9459 !important;
        }
        div {
            background: #DE9459;
            ::after {
                border-color: #DE9459;
            }
        }
    }
    :nth-child(2) {
        span {
            width: 152px;
            border-top-color: #EDCB68 !important;
        }
        div {
            background: #EDCB68;
            ::after {
                border-color: #EDCB68;
            }
        }
    }
    :nth-child(3) {
        span {
            width: 122px;
            border-top-color: #5959F1 !important;
        }
        div {
            background: #5959F1;
            ::after {
                border-color: #5959F1;
            }
        }
    }
    :nth-child(4) {
        span {
            width: 94px;
            border-top-color: #F05447 !important;
        }
        div {
            background: #F05447;
            ::after {
                border-color: #F05447;
            }
        }
    }
`
export const FunnelText = styled(Box)`
    width: 20%;
    display: flex;
    justify-content: flex-end;
    gap: .25rem;
    position: absolute;
    right: 0;
    background: transparent !important;
    span, strong {
        border-top: 0 !important;
        max-width: 32px;
        font-size: 14px;
        color: ${({ theme }) => theme.palette.grey[700]};
    }
`