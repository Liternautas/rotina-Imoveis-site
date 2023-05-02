import { useEffect, useState, useRef } from "react";
import { useUser } from "@/src/contexts/UserContext";
import { useForm } from "@/src/hooks/useForm";
import { IUser } from "@/src/interfaces";
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography, Avatar, Autocomplete } from "@mui/material";
import { getImageUrl } from "@/src/helpers/functions";
import { roles } from "@/src/ui/components/modals/ModalAddUser";
import { useSelect } from "@/src/hooks/useSelect";

interface Props {
    user: IUser;
}
interface IRole {
    id: number,
    name: string,
    enum: string
}

export function CollaboratorsUpdate({ user }: Props) {
    const { update, uploadAvatar } = useUser();
    const fileInputRef = useRef(null);
    const email = useForm();
    const name = useForm();
    const document = useForm('cpf');
    const creci = useForm();
    const password = useForm();
    const phone = useForm('phone');
    const role = useSelect(roles);
    const [avatar, setAvatar] = useState(null);

    const handleUploadAvatar = async ({ target }) => {
        await uploadAvatar(user.id, target.files[0]);
        setAvatar(target.files[0]);
    }

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = async () => {
        await update({
            email: email.value,
            name: name.value,
            phone: phone.value,
            id: user.id,
            role: role.value.enum,
            document: document.value,
            creci: creci.value
        });
    }

    useEffect(() => {
        if (user) {
            email.setValue(user.email);
            name.setValue(user.name);
            phone.setValue(user.phone);
            document.setValue(user.document);
            creci.setValue(user.creci);
            role.onChange(roles.find(value => value.enum === user.role) as IRole);
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
                <Box sx={{
                    width: '100%',
                    maxWidth: 400,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start'
                }}>
                    {avatar &&
                        <Avatar
                            src={avatar && URL.createObjectURL(avatar)}
                            sx={{
                                width: 80,
                                height: 80,
                                mb: 1
                            }} onClick={handleButtonClick}>
                            {name.value.substring(0, 1)}
                        </Avatar>}
                    {user.avatar && !avatar &&
                        <Avatar
                            src={getImageUrl(user.avatar)}
                            sx={{
                                width: 80,
                                height: 80,
                                mb: 1
                            }} onClick={handleButtonClick}>
                            {name.value.substring(0, 1)}
                        </Avatar>}
                    {!avatar && !user.avatar &&
                        <Avatar
                            sx={{
                                width: 80,
                                height: 80,
                                mb: 1
                            }} onClick={handleButtonClick}>
                            {name.value.substring(0, 1)}
                        </Avatar>}
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleUploadAvatar}
                    />
                    <Button
                        variant="outlined"
                        onClick={handleButtonClick}
                    >
                        Selecionar foto
                    </Button>
                </Box>
                <TextField id="outlined-basic" label="Nome" variant="outlined" value={name.value} onChange={e => name.onChange(e)} />
                <TextField id="outlined-basic" label="Telefone" variant="outlined" value={phone.value} onChange={e => phone.onChange(e)} />
                <TextField id="outlined-basic" label="CPF (Opcional)" variant="outlined" value={document.value} onChange={e => document.onChange(e)} fullWidth />
                <TextField id="outlined-basic" label="Creci (Opcional)" variant="outlined" value={creci.value} onChange={e => creci.onChange(e)} fullWidth />
                <TextField id="outlined-basic" label="Email" variant="outlined" value={email.value} onChange={e => email.onChange(e)} />
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={role.options}
                    sx={{ flex: 1, minWidth: 200 }}
                    value={role.value}
                    onChange={(e, value) => role.onChange(value)}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="Tipo" />}
                    renderOption={(props, option) => <Box component={'li'} {...props}>{option.name}</Box>}
                />
                <Button variant="contained" sx={{
                    color: '#fff',
                    height: 48,
                    fontWeight: 600
                }} onClick={handleSubmit}>Salvar</Button>
            </Box>
        </Container>
    )
}