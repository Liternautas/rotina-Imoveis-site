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
    maxWidth: 720,
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

export function ModalAddDeals() {
    const [value, setValue] = useState(0);
    const { create } = useUser();

    const email = useForm();
    const name = useForm();
    const password = useForm();
    const phone = useForm('phone');

    const [open, setOpen] = useState(false);
    const [role, setRole] = useState(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = async () => {
        await create({
            email: email.value,
            name: name.value,
            password: password.value,
            phone: phone.value
        }, role.enum);
        handleClose();
    }

    useEffect(() => {
    }, []);

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
                        Cadastrar negócio
                    </Typography>
                    <Box sx={{
                        my: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                    }}>
                        <TextField id="outlined-basic" label="Título" variant="outlined" value={name.value} onChange={e => name.onChange(e)} fullWidth />
                        <Box sx={{ mb: 2 }}>
                            <Typography sx={{ mb: 2 }} variant="subtitle1">O que você deseja fazer?</Typography>
                            <Box sx={{ display: "flex", gap: 2, width: 'fit-content' }}>
                                <Button variant={value === 0 ? "contained" : "outlined"} sx={{ color: value === 0 && '#fff' }} onClick={() => setValue(0)}>Vender</Button>
                                <Button variant={value === 1 ? "contained" : "outlined"} sx={{ color: value === 1 && '#fff' }} onClick={() => setValue(1)}>Alugar</Button>
                            </Box>
                        </Box>

                        <Box sx={{
                            display: "flex",
                            gap: 2
                        }}>
                            <FormControl fullWidth>
                                <InputLabel>Responsável</InputLabel>
                                <Select
                                    value={role}
                                    renderValue={(value) => <Box>{value?.name}</Box>}
                                    label="Responsável"
                                >
                                    {roles.map(role => <MenuItem value={role.enum} onClick={() => setRole(role)}>{role.name}</MenuItem>)}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel>Contato</InputLabel>
                                <Select
                                    value={role}
                                    renderValue={(value) => <Box>{value?.name}</Box>}
                                    label="Contato"
                                >
                                    {roles.map(role => <MenuItem value={role.enum} onClick={() => setRole(role)}>{role.name}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Box>

                        <Box sx={{
                            display: "flex",
                            gap: 2
                        }}>
                            <TextField
                                id="outlined-basic"
                                label="Valor"
                                type={'number'}
                                variant="outlined"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                                }}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Valor de entrada"
                                type={'number'}
                                variant="outlined"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                                }}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Renda mensal"
                                type={'number'}
                                variant="outlined"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                                }}
                            />
                        </Box>

                        <Box sx={{
                            display: "flex",
                            gap: 2
                        }}>
                            <TextField
                                id="outlined-basic"
                                label="Porcentagem da comissão"
                                type={'number'}
                                variant="outlined"
                                translate="yes"
                                InputLabelProps={{
                                    shrink: true
                                }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">%</InputAdornment>,
                                }}
                            />
                        </Box>
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
                            Cadastrar
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}