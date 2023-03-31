import { useUser } from "@/src/contexts/UserContext";
import { useForm } from "@/src/hooks/useForm";
import { IUser } from "@/src/interfaces";
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface Props {
    user: IUser;
}
interface IRole {
    id: number,
    name: string,
    enum: string
}

const roles: IRole[] = [
    {   
        id: 0,
        name: 'Administrador',
        enum: 'admin'
    },
    {
        id: 1,
        name: 'Colaborador',
        enum: 'collaborator'
    },
    {
        id: 2,
        name: 'Corretor',
        enum: 'realtor'
    },
    {
        id: 3,
        name: 'Proprietário',
        enum: 'owner'
    },
    {
        id: 3,
        name: 'Cliente',
        enum: 'customer'
    },
]

export function CollaboratorsUpdate({ user }: Props) {
    const { update } = useUser();

    const email = useForm();
    const name = useForm();
    const password = useForm();
    const phone = useForm('phone');
    const [role, setRole] = useState<IRole>();

    const handleSubmit = async () => {
        await update({
            email: email.value,
            name: name.value,
            password: password.value,
            phone: phone.value,
            id: user.id,
            role: role.enum
        });
    }

    useEffect(() => {
        if(user) {
            email.setValue(user.email);
            name.setValue(user.name);
            phone.setValue(user.phone);
            setRole(roles.find(value => value.enum === user.role));
        }
    }, [user]);

    return (
        <Container sx={{
            display: 'flex',
            flexDirection: 'column',
        }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Atualizar usuário
            </Typography>
            <Box sx={{
                my: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                maxWidth: 400
            }}>
                <TextField id="outlined-basic" label="Nome" variant="outlined" value={name.value} onChange={e => name.onChange(e)} />
                <TextField id="outlined-basic" label="Telefone" variant="outlined" value={phone.value} onChange={e => phone.onChange(e)} />
                <TextField id="outlined-basic" label="Email" variant="outlined" value={email.value} onChange={e => email.onChange(e)} />
                <FormControl>
                    <InputLabel id="demo-simple-select-label" shrink={true}>Função</InputLabel>
                    <Select
                        value={role || ""} // THIS IS NEEDED
                        defaultValue={role || ""}
                        displayEmpty
                        renderValue={(value: IRole) => <Box>{value.name ?? ''}</Box>}
                        label="Função"
                    >
                        {roles.map(role => <MenuItem value={role.id} onClick={() => setRole(role)}>{role.name}</MenuItem>)}
                    </Select>
                </FormControl>
                <Button variant="contained" sx={{
                    color: '#fff',
                    height: 48,
                    fontWeight: 600
                }} onClick={handleSubmit}>Salvar</Button>
            </Box>
        </Container>
    )
}