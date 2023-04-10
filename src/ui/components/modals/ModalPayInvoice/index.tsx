import { useUser } from "@/src/contexts/UserContext";
import { useForm } from "@/src/hooks/useForm";
import { Role } from "@/src/interfaces";
import { Box, Button, FormControl, InputAdornment, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: 500,
    borderRadius: 1,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
    pt: 3
};

const roles = [
    {
        name: 'Administrador',
        enum: 'admin'
    },
    {
        name: 'Colaborador',
        enum: 'collaborator'
    },
    {
        name: 'Corretor',
        enum: 'realtor'
    },
    {
        name: 'Proprietário',
        enum: 'owner'
    },
    {
        name: 'Cliente',
        enum: 'customer'
    },
]

export function ModalPayInvoice({ children, onSubmit }) {
    const payment = useForm('date');

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const handleSubmit = async () => {
        if (payment.validate()) {
            await onSubmit(payment.value);
            handleClose();
        }
    }

    useEffect(() => {
    }, []);

    return (
        <>
            <Box onClick={async () => {
                setOpen(true);
            }}>
                {children}
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Quitar fatura
                    </Typography>
                    <Box sx={{
                        my: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                    }}>
                        <TextField
                            label="Data do recebimento"
                            variant="outlined"
                            value={payment?.value}
                            onChange={(e) => payment.onChange(e)}
                            type={"date"}
                            sx={{ width: 200 }}
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                    </Box>
                    <Box sx={{
                        height: 48,
                        display: 'flex',
                        gap: 2
                    }}>
                        <Button
                            onClick={handleClose}
                            variant="outlined"
                            fullWidth
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                            sx={{
                                color: "#fff",
                                fontWeight: 600
                            }}
                            fullWidth
                        >
                            Quitar fatura
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}