import { useEffect, useRef, useState } from "react";
import { Container, Box, Tabs, Tab, TextField, Avatar, Button, Alert } from "@mui/material";
import { useForm } from "@/src/hooks/useForm";
import { TableSalesAdmin } from "../../components/Tables/table-sales-admin";
import { TableRentalAdmin } from "../../components/Tables/table-rental-admin";
import { TableInvoiceAdmin } from "../../components/Tables/table-invoice-admin";

export function CustomerArea() {
    const fileInputRef = useRef(null);
    const [value, setValue] = useState(0);
    const name = useForm();
    const email = useForm();
    const phone = useForm('phone');
    const document = useForm('cpf');
    const [avatar, setAvatar] = useState(null);

    const handleUploadAvatar = ({ target }) => {
        setAvatar(target.files[0]);
    }

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => {
        name.setValue('Ezequiel Pires e Silva');
        email.setValue('ezequiel.pires082000@gmail.com');
        phone.setValue('(64) 99926-8117');
        document.setValue('069.017.831-08');
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
                            <Avatar
                                src={avatar && URL.createObjectURL(avatar)}
                                sx={{
                                    width: 80,
                                    height: 80,
                                    mb: 1
                                }} onClick={handleButtonClick}></Avatar>
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
                        <Button variant="contained" sx={{ width: 400, color: '#fff', height: 48 }}>Salvar</Button>
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
                        <TableSalesAdmin contracts={[]} action={false} />
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