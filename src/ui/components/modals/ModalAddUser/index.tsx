import { useUser } from "@/src/contexts/UserContext";
import { useForm } from "@/src/hooks/useForm";
import { useSelect } from "@/src/hooks/useSelect";
import { Autocomplete, Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    maxWidth: '100%',
    height: {
        xs: '100vh',
        md: '90vh'
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflow: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 1,
    p: 2,
    pt: 3
};

export const roles = [
    {
        id: 1,
        name: 'Analista administrativo',
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

export const maritalsStatus = [
    {
        id: 0,
        name: 'Solteiro(a)',
        enum: 'solteiro'
    },
    {
        id: 1,
        name: 'Casado(a)',
        enum: 'casado'
    },
    {
        id: 2,
        name: 'Viúvo(a)',
        enum: 'viuvo'
    },
    {
        id: 3,
        name: 'Divorciado(a)',
        enum: 'divorciado'
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
    const maritalStatus = useSelect();
    const cpf = useForm('cpf');
    const rg = useForm('rg');
    const profession = useForm();
    const nationality = useForm();

    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const [role, setRole] = useState(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = async () => {
        if (name.validate() && phone.validate()) {
            if (!(role.enum === 'customer') && !(role.enum === 'owner')) {
                if (!email.validate() || !password.validate()) {
                    return;
                }
            }
            await create({
                email: email.value && email.value != '' ? email.value : null,
                name: name.value,
                password: password.value && password.value != '' ? password.value : null,
                phone: phone.value,
                document: document.value,
                creci: creci.value && creci.value != '' ? creci.value : null,
                cpf: cpf.value && cpf.value != '' ? cpf.value : null,
                rg: rg.value && rg.value != '' ? rg.value : null,
                nationality: nationality.value && nationality.value != '' ? nationality.value : null,
                maritalStatus: maritalStatus.value.enum,
                profession: profession.value && profession.value != '' ? profession.value : null
            }, role.enum);
            handleClose();
        } else {

        }
    }

    useEffect(() => {
        maritalStatus.setOptions(maritalsStatus);
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
                    <Box>
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
                            {
                                role?.name === 'Cliente' &&
                                <>
                                    <Box sx={{ display: "flex", flexWrap: 'wrap', gap: 2 }}>
                                        <TextField
                                            label="CPF"
                                            variant="outlined"
                                            value={cpf.value}
                                            onChange={(e) => cpf.onChange(e)}
                                            sx={{ minWidth: 200, flex: 1 }}
                                        />
                                        <TextField
                                            label="RG"
                                            variant="outlined"
                                            value={rg.value}
                                            onChange={(e) => rg.onChange(e)}
                                            sx={{ minWidth: 200, flex: 1 }}
                                        />
                                    </Box>
                                    <TextField
                                        label="Profissão"
                                        variant="outlined"
                                        value={profession.value}
                                        onChange={(e) => profession.onChange(e)}
                                        sx={{ width: '100%' }}
                                    />
                                    <Box sx={{ display: "flex", flexWrap: 'wrap', gap: 2 }}>
                                        <TextField
                                            label="Nacionalidade"
                                            variant="outlined"
                                            value={nationality.value}
                                            onChange={(e) => nationality.onChange(e)}
                                            sx={{ minWidth: 200, flex: 1 }}
                                        />
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            options={maritalStatus?.options}
                                            value={maritalStatus.value}
                                            onChange={(e, value) => maritalStatus.onChange(value)}
                                            getOptionLabel={(option) => option.name}
                                            renderInput={(params) => <TextField {...params} label="Estado Civil" />}
                                            renderOption={(props, option) => <Box component={'li'} {...props}>{option.name}</Box>}
                                            sx={{ minWidth: 200, flex: 1 }}
                                        />
                                    </Box>
                                </>
                            }
                            {
                                role?.name === 'Corretor' &&
                                <TextField id="outlined-basic" label="Creci (Opcional)" variant="outlined" value={creci.value} onChange={e => creci.onChange(e)} fullWidth />
                            }
                        </Box>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        gap: 2,
                        height: 48
                    }}>
                        <Button
                            onClick={handleClose}
                            variant="outlined"
                            fullWidth
                            sx={{height: 48}}
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                            sx={{
                                color: "#fff",
                                fontWeight: 600,
                                height: 48
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