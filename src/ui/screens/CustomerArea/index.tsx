import { useEffect, useRef, useState } from "react";
import { Container, Box, Tabs, Tab, TextField, Avatar, Button, Alert } from "@mui/material";
import { useForm } from "@/src/hooks/useForm";
import { TableSalesAdmin } from "../../components/Tables/table-sales-admin";
import { TableRentalAdmin } from "../../components/Tables/table-rental-admin";
import { TableInvoiceAdmin } from "../../components/Tables/table-invoice-admin";
import { useUser } from "@/src/contexts/UserContext";
import { IUser } from "@/src/interfaces";
import { getImageUrl } from "@/src/helpers/functions";

interface Props {
    user: IUser;
}

export function CustomerArea({ user }: Props) {
    const { update, uploadAvatar } = useUser();
    const fileInputRef = useRef(null);
    const [value, setValue] = useState(0);
    const name = useForm();
    const email = useForm();
    const phone = useForm('phone');
    const document = useForm('cpf');
    const [avatar, setAvatar] = useState(null);

    const handleUploadAvatar = async ({ target }) => {
        await uploadAvatar(user.id, target.files[0]);
        setAvatar(target.files[0]);
    }

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleSubmit = async () => {
        await update({
            id: user.id,
            document: document.value,
            email: email.value,
            name: name.value,
            phone: phone.value
        })
    }

    useEffect(() => {
        name.setValue(user.name);
        email.setValue(user.email);
        phone.setValue(user.phone);
        document.setValue(user.document);
    }, []);

    return (
        <Box sx={{
            mt: '64px',
            pt: 3,
        }}>
            <Container sx={{
                minHeight: '70vh'
            }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Dados pessoais" />
                        <Tab label="Compras" />
                        <Tab label="Locações" />
                        <Tab label="Faturas" />
                        <Tab label="Favoritos" />
                    </Tabs>
                </Box>
                {
                    value === 0 &&
                    <Box sx={{
                        my: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                    }}>
                        <Box sx={{
                            width: 400,
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
                        <TextField id="outlined-basic" sx={{ width: 400 }} label="Nome" variant="outlined" value={name.value} onChange={e => name.onChange(e)} fullWidth />
                        <TextField id="outlined-basic" sx={{ width: 400 }} label="Telefone" variant="outlined" value={phone.value} onChange={e => phone.onChange(e)} fullWidth />
                        <TextField id="outlined-basic" sx={{ width: 400 }} label="Email" variant="outlined" value={email.value} onChange={e => email.onChange(e)} fullWidth />
                        <TextField id="outlined-basic" sx={{ width: 400 }} label="CPF" variant="outlined" value={document.value} onChange={e => document.onChange(e)} fullWidth />
                        <Button variant="contained" sx={{ width: 400, color: '#fff', height: 48 }} onClick={handleSubmit}>Salvar</Button>
                    </Box>
                }
                {
                    value === 1 &&
                    <Box sx={{
                        my: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                    }}>
                        <TableSalesAdmin contracts={user.salesContractsBuyer} action={false} />
                    </Box>
                }
                {
                    value === 2 &&
                    <Box sx={{
                        my: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                    }}>
                        <TableRentalAdmin contracts={[]} action={false} />
                    </Box>
                }
                {
                    value === 3 &&
                    <Box sx={{
                        my: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                    }}>
                        <TableInvoiceAdmin invoices={[]} action={false} />
                    </Box>
                }
                {
                    value === 4 &&
                    <Box sx={{
                        my: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                    }}>
                        <Alert severity="info">Você ainda não possui imóveis favoritados!</Alert>
                    </Box>
                }
            </Container>
        </Box>
    );
}