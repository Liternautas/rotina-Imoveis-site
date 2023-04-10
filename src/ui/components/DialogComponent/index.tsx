import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box } from "@mui/material";

interface Props {
    title: string;
    description?: string;
    onSubmit?: () => Promise<void>;
    children: any;
}

export function DialogComponent({ children, title, description, onSubmit }: Props) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Box onClick={async () => {
                setOpen(true);
            }}>
                {children}
            </Box>
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
                    <Button 
                    onClick={() => onSubmit().then(() => handleClose())} 
                    autoFocus 
                    variant="contained"
                    sx={{
                        color: '#fff',
                        fontWeight: 600
                    }}
                    >
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}