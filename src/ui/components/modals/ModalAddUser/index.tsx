import { useUser } from "@/src/contexts/UserContext";
import { useForm } from "@/src/hooks/useForm";
import { Role } from "@/src/interfaces";
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    maxWidth: '100%',
    height: {
        xs: '100vh',
        md: 'fit-content'
    },
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
    pt: 3
};

export const roles = [
    {
        id: 1,
        name: 'Assistente Administrativo',
        enum: 'admin'
    },
    {
        id: 2,
        name: 'Estagiário',
        enum: 'collaborator'
    },
    {
        id: 3,
        name: 'Corretor',
        enum: 'realtor'
    },
    {
        id: 4,
        name: 'Proprietário',
        enum: 'owner'
    },
    {
        id: 5,
        name: 'Cliente',
        enum: 'customer'
    },
    {
        id: 6,
        name: 'Super Admin',
        enum: 'super_admin'
    },
]

export function ModalAddUser() {
    const { create } = useUser();

    const email = useForm();
    const name = useForm();
    const password = useForm();
    const document = useForm('cpf');
    const creci = useForm();
    const phone = useForm('phone');

    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const [role, setRole] = useState(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = async () => {
        if(email.validate() && name.validate() && password.validate() && phone.validate()) {
            await create({
                email: email.value,
                name: name.value,
                password: password.value,
                phone: phone.value,
                document: document.value,
                creci: creci.value
            }, role.enum);
            handleClose();
        } else {
            
        }
    }

    return (
        <>
            <Button
                onClick={handleOpen}
                variant="contained"
                sx={{
                    color: "#fff",
                    fontWeight: 600
                }}
            >
                Cadastrar
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Cadastrar usuário
                    </Typography>
                    <Box sx={{
                        my: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                    }}>
                        <TextField id="outlined-basic" label="Nome" variant="outlined" value={name.value} onChange={e => name.onChange(e)} fullWidth />
                        <TextField id="outlined-basic" label="Telefone" variant="outlined" value={phone.value} onChange={e => phone.onChange(e)} fullWidth />
                        <TextField id="outlined-basic" label="CPF (Opcional)" variant="outlined" value={document.value} onChange={e => document.onChange(e)} fullWidth />
                        <TextField id="outlined-basic" label="Creci (Opcional)" variant="outlined" value={creci.value} onChange={e => creci.onChange(e)} fullWidth />
                        <TextField id="outlined-basic" label="Email" variant="outlined" value={email.value} onChange={e => email.onChange(e)} fullWidth />
                        <TextField id="outlined-basic" label="Senha" variant="outlined" value={password.value} onChange={e => password.onChange(e)} fullWidth />
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Função</InputLabel>
                            <Select
                                value={role}
                                renderValue={(value) => <Box>{value?.name}</Box>}
                                label="Função"
                            >
                                {roles.map(role => <MenuItem value={role.enum} onClick={() => setRole(role)}>{role.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{
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
                            Cadastrar
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}