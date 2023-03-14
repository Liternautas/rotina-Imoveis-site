import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";

interface Props {
    title: string;
    description?: string;
    onSubmit?: () => Promise<void>;
    children: any;
}

export function DialogIcon({ children, title, description, onSubmit }: Props) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <IconButton onClick={async () => {
                setOpen(true);
            }}>
                {children}
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined">Cancelar</Button>
                    <Button onClick={onSubmit} autoFocus variant="contained">
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}