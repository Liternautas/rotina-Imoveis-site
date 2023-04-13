import {Backdrop, CircularProgress} from "@mui/material";

export function Loading({open}) {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: 9999}}
            open={open}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}