import { useEffect, useState } from "react";
import { CardPropertyH } from "@/src/ui/components/Cards/CardPropertyH";
import { useForm } from "@/src/hooks/useForm";
import { OptionSelectProps, useSelect } from "@/src/hooks/useSelect";
import { IProperty, IRentalContract, IUser } from "@/src/interfaces";
import { api } from "@/src/services/api";
import { DateRangeOutlined, Search } from "@mui/icons-material";
import { Alert, Autocomplete, Box, Button, Container, InputAdornment, IconButton, InputBase, Paper, TextField, Typography } from "@mui/material";
import DatePicker from "react-datepicker";
import { useContracts } from "@/src/contexts/ContractsContext";
import { useAddress } from "@/src/hooks/useAddress";
import { Loading } from "@/src/ui/components/Loading";
import { maskCpf } from "@/src/helpers/mask";

const types = [
    {
        id: 0,
        name: 'Contrato de Aluguel'
    },
    {
        id: 1,
        name: 'Contrato de Venda'
    },
]
const durations = [
    {
        id: 0,
        name: '6 meses',
        enum: 6
    },
    {
        id: 1,
        name: '12 meses',
        enum: 12
    },
    {
        id: 2,
        name: '18 meses',
        enum: 18
    },
    {
        id: 3,
        name: '24 meses',
        enum: 24
    },
]
const maritalsStatus = [
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
const paymentLimits = [
    {
        id: 0,
        name: 1,
        enum: 1
    },
    {
        id: 1,
        name: 2,
        enum: 2
    },
    {
        id: 2,
        name: 3,
        enum: 3
    },
    {
        id: 3,
        name: 4,
        enum: 4
    },
    {
        id: 4,
        name: 5,
        enum: 5
    },
    {
        id: 5,
        name: 6,
        enum: 6
    },
    {
        id: 6,
        name: 7,
        enum: 7
    },
    {
        id: 7,
        name: 8,
        enum: 8
    },
    {
        id: 8,
        name: 9,
        enum: 9
    },
    {
        id: 9,
        name: 10,
        enum: 10
    },
    {
        id: 10,
        name: 11,
        enum: 11
    },
    {
        id: 11,
        name: 12,
        enum: 12
    },
    {
        id: 12,
        name: 13,
        enum: 13
    },
    {
        id: 13,
        name: 14,
        enum: 14
    },
    {
        id: 14,
        name: 15,
        enum: 15
    },
    {
        id: 15,
        name: 16,
        enum: 16
    },
    {
        id: 16,
        name: 17,
        enum: 17
    },
    {
        id: 17,
        name: 18,
        enum: 18
    },
    {
        id: 18,
        name: 19,
        enum: 19
    },
    {
        id: 19,
        name: 20,
        enum: 20
    },
    {
        id: 20,
        name: 21,
        enum: 21
    },
    {
        id: 21,
        name: 22,
        enum: 22
    },
    {
        id: 22,
        name: 23,
        enum: 23
    },
    {
        id: 23,
        name: 24,
        enum: 24
    },
    {
        id: 24,
        name: 25,
        enum: 25
    },
    {
        id: 25,
        name: 26,
        enum: 26
    },
    {
        id: 26,
        name: 27,
        enum: 27
    },
    {
        id: 27,
        name: 28,
        enum: 28
    },
    {
        id: 28,
        name: 29,
        enum: 29
    },
    {
        id: 29,
        name: 30,
        enum: 30
    },
    {
        id: 30,
        name: 31,
        enum: 31
    },
]

export function CreateRentals({ customers, realtors, owners }) {
    const { createRental } = useContracts();

    const contractType = useSelect();
    const realtor = useSelect();
    const tenant = useSelect();
    const pickup = useSelect();
    const duration = useSelect();
    const maritalStatus = useSelect(maritalsStatus);
    const paymentLimit = useSelect();
    const owner = useSelect();

    const code = useForm('number');
    const price = useForm('price');
    const pix = useForm();
    const shorts = useForm('price');
    const cpf = useForm('cpf');
    const rg = useForm('rg');
    const profession = useForm();
    const nationality = useForm();

    const guarantorName = useForm();
    const guarantorEmail = useForm('email');
    const guarantorCpf = useForm('cpf');
    const guarantorRg = useForm('rg');
    const guarantorProfession = useForm();
    const guarantorNationality = useForm();
    const guarantorPhone = useForm('phone');
    const guarantorMaritalStatus = useSelect(maritalsStatus);


    const [property, setProperty] = useState<IProperty>(null);
    const [propertyError, setPropertyError] = useState(false);
    const startDate = useForm();
    const endDate = useForm();
    const signatureDate = useForm();
    const [loading, setLoading] = useState(false);

    const getValue = (value: string) => value && value != '' ? value : null;

    const handleSearchProperty = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            const res = await api.get(`properties/code/${code.value ?? 0}`).then(res => res.data);
            if (res.success) {
                setProperty(res.property);
                { propertyError && setPropertyError(false) }
            } else {
                throw new Error(res.message);
            }
        } catch (error) {
            setPropertyError(true);
            setProperty(null);
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = async () => {
        const contract: IRentalContract = {
            owner: owner?.value ? {
                id: owner.value.id.toString()
            } : null,
            tenant: {
                id: tenant.value.id.toString()
            },
            signatureDate: new Date(signatureDate.value),
            start: new Date(startDate.value),
            end: new Date(endDate.value),
            price: price.value,
            pix: getValue(pix.value),
            shorts: shorts.value,
            property: {
                id: property.id
            },
            cpf: cpf.value,
            rg: rg.value,
            duration: +duration.value.enum,
            maritalStatus: maritalStatus.value.enum,
            nationality: nationality.value,
            paymentLimit: +paymentLimit.value.enum,
            profession: profession.value,

            guarantorCpf: getValue(guarantorCpf.value),
            guarantorEmail: getValue(guarantorEmail.value),
            guarantorMaritalStatus: getValue(guarantorMaritalStatus.value?.enum) ?? null,
            guarantorName: getValue(guarantorName?.value),
            guarantorNationality: getValue(guarantorNationality?.value),
            guarantorPhone: getValue(guarantorPhone?.value),
            guarantorProfession: getValue(guarantorProfession?.value),
            guarantorRg: getValue(guarantorRg?.value)
        }
        await createRental(contract);
    }

    useEffect(() => {
        if (duration.value && startDate.value) {
            const data = new Date(startDate.value);
            data.setMonth(data.getMonth() + Number(duration.value.enum));
            const dataFormatada = data.toISOString().slice(0, 10);
            endDate.setValue(dataFormatada);
        }
    }, [duration.value, startDate.value]);


    useEffect(() => {
        contractType.setOptions(types);
        duration.setOptions(durations);
        maritalStatus.setOptions(maritalsStatus);
        paymentLimit.setOptions(paymentLimits);
        pix.setValue('Celular: (64) 98168-0018');
    }, []);

    useEffect(() => {
        { customers && tenant.setOptions(customers) }
    }, [customers]);

    useEffect(() => {
        { realtors && realtor.setOptions(realtors) }
    }, [realtors]);

    useEffect(() => {
        { owners && owner.setOptions(owners) }
    }, [owners]);

    useEffect(() => {
        { property && pickup.onChange(property.pickup as OptionSelectProps) }
        { property && owner.onChange(property.owner as OptionSelectProps) }
    }, [property]);

    useEffect(() => {
        const user = tenant.value as IUser;
        if (user) {
            cpf.setValue(maskCpf(user.cpf ?? ''));
            rg.setValue(user.rg ?? '');
            nationality.setValue(user.nationality ?? '');
            profession.setValue(user.profession ?? '');
            { user.maritalStatus && maritalStatus.onChange(maritalsStatus.find(item => item.enum === user.maritalStatus)) }
        }
    }, [tenant.value]);

    return (
        <Box sx={{
            pt: 3,
            minHeight: '100vh',
            background: `#fafafa`
        }}>
            <Loading open={loading} />
            <Container>
                <Typography variant="h2" sx={{
                    fontSize: 24,
                    fontWeight: 600,
                    mb: 2
                }}>Cadastrar Contrato de Locação</Typography>
                <Box sx={{ mb: 5, width: 400, display: "flex", flexDirection: "column", gap: 1 }}>
                    <Typography variant="h6">Busque a propriedade</Typography>
                    <Paper
                        component="form"
                        onSubmit={handleSearchProperty}
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Código do imóvel"
                            inputProps={{ 'aria-label': 'search google maps' }}
                            value={code.value}
                            onChange={code.onChange}
                        />
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearchProperty}>
                            <Search />
                        </IconButton>
                    </Paper>
                    {propertyError && <Alert severity="error">Propriedade não encontrada!</Alert>}
                </Box>
                <Box sx={{ width: "fit-content" }}>
                    {property && <CardPropertyH property={property} isLink={false} />}
                </Box>
                {property &&
                    <Box sx={{ maxWidth: 720, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2 }}>
                        <Box sx={{ mt: 5, maxWidth: 720, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2 }}>
                            <Typography variant="h6">Dados do contrato</Typography>
                            <Box sx={{ display: "flex", gap: 2, width: '100%' }}>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={pickup?.options}
                                    value={pickup.value}
                                    onChange={(e, value) => pickup.onChange(value)}
                                    getOptionLabel={(option) => option.name}
                                    renderInput={(params) => <TextField {...params} label="Captador (Opcional)" />}
                                    renderOption={(props, option) => <Box component={'li'} {...props}>{option.name}</Box>}
                                    sx={{ flex: 1 }}
                                    readOnly
                                />
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={owner?.options}
                                    value={owner.value}
                                    onChange={(e, value) => owner.onChange(value)}
                                    getOptionLabel={(option) => option.name}
                                    renderInput={(params) => <TextField {...params} label="Proprietário" />}
                                    renderOption={(props, option) => <Box component={'li'} {...props}>{option.name}</Box>}
                                    sx={{ flex: 1 }}
                                />
                            </Box>
                            <Box sx={{ display: "flex", gap: 2 }}>
                                <TextField
                                    label="Início"
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><DateRangeOutlined /></InputAdornment>,
                                    }}
                                    type="date"
                                    value={startDate.value}
                                    onChange={(e) => startDate.onChange(e)}
                                    sx={{ width: 200 }}
                                />
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={duration?.options}
                                    value={duration.value}
                                    onChange={(e, value) => duration.onChange(value)}
                                    getOptionLabel={(option) => option.name}
                                    renderInput={(params) => <TextField {...params} label="Duração" />}
                                    renderOption={(props, option) => <Box component={'li'} {...props}>{option.name}</Box>}
                                    sx={{ width: 200 }}
                                />
                                <TextField
                                    label="Final"
                                    variant="outlined"
                                    InputProps={{
                                        readOnly: true,
                                        startAdornment: <InputAdornment position="start"><DateRangeOutlined /></InputAdornment>,
                                    }}
                                    type="date"
                                    value={endDate.value}
                                    onChange={(e) => endDate.onChange(e)}
                                    sx={{ width: 200 }}
                                />
                            </Box>
                            <Box sx={{ display: "flex", gap: 2 }}>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={paymentLimit?.options}
                                    value={paymentLimit.value}
                                    onChange={(e, value) => paymentLimit.onChange(value)}
                                    getOptionLabel={(option) => option.name}
                                    renderInput={(params) => <TextField {...params} label="Dia limite" />}
                                    renderOption={(props, option) => <Box component={'li'} {...props}>{option.name}</Box>}
                                    sx={{ width: 200 }}
                                />
                                <TextField
                                    label="Valor"
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                                    }}
                                    value={price.value}
                                    onChange={(e) => price.onChange(e)}
                                    sx={{ width: 200 }}
                                />
                                <TextField
                                    label="Data de assinatura"
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><DateRangeOutlined /></InputAdornment>,
                                    }}
                                    type="date"
                                    value={signatureDate.value}
                                    onChange={(e) => signatureDate.onChange(e)}
                                    sx={{ width: 200 }}
                                />
                            </Box>
                            <Box sx={{ display: "flex", gap: 2, width: '100%' }}>
                                <TextField
                                    label="Calção"
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                                    }}
                                    value={shorts.value}
                                    onChange={(e) => shorts.onChange(e)}
                                    sx={{ width: 200 }}
                                />
                                <TextField
                                    label="Chave pix"
                                    variant="outlined"
                                    value={pix.value}
                                    onChange={(e) => pix.onChange(e)}
                                    sx={{ flex: 1 }}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ mt: 5, maxWidth: 720, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2 }}>
                            <Typography variant="h6">Dados do Inquilino</Typography>
                            <Box sx={{ display: "flex", gap: 2 }}>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={tenant?.options}
                                    value={tenant.value}
                                    onChange={(e, value) => tenant.onChange(value)}
                                    getOptionLabel={(option) => option.name}
                                    renderInput={(params) => <TextField {...params} label="Inquilino" />}
                                    renderOption={(props, option) => <Box component={'li'} {...props}>{option.name}</Box>}
                                    sx={{ width: 200 }}
                                />
                                <TextField
                                    label="CPF"
                                    variant="outlined"
                                    value={cpf.value}
                                    onChange={(e) => cpf.onChange(e)}
                                    sx={{ width: 200 }}
                                />
                                <TextField
                                    label="RG"
                                    variant="outlined"
                                    value={rg.value}
                                    onChange={(e) => rg.onChange(e)}
                                    sx={{ width: 200 }}
                                />
                            </Box>
                            <Box sx={{ display: "flex", gap: 2 }}>
                                <TextField
                                    label="Profissão"
                                    variant="outlined"
                                    value={profession.value}
                                    onChange={(e) => profession.onChange(e)}
                                    sx={{ width: 200 }}
                                />
                                <TextField
                                    label="Nacionalidade"
                                    variant="outlined"
                                    value={nationality.value}
                                    onChange={(e) => nationality.onChange(e)}
                                    sx={{ width: 200 }}
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
                                    sx={{ width: 200 }}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ mt: 5, maxWidth: 720, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2 }}>
                            <Typography variant="h6">Dados do Fiador</Typography>
                            <Box sx={{ display: "flex", gap: 2, width: '100%' }}>
                                <TextField
                                    label="Nome"
                                    variant="outlined"
                                    value={guarantorName.value}
                                    onChange={(e) => guarantorName.onChange(e)}
                                    fullWidth
                                    sx={{ flex: 1 }}
                                />
                                <TextField
                                    label="Email"
                                    variant="outlined"
                                    value={guarantorEmail.value}
                                    onChange={(e) => guarantorEmail.onChange(e)}
                                    sx={{ flex: 1 }}
                                />
                            </Box>
                            <Box sx={{ display: "flex", gap: 2 }}>
                                <TextField
                                    label="CPF"
                                    variant="outlined"
                                    value={guarantorCpf.value}
                                    onChange={(e) => guarantorCpf.onChange(e)}
                                    sx={{ width: 200 }}
                                />
                                <TextField
                                    label="RG"
                                    variant="outlined"
                                    value={guarantorRg.value}
                                    onChange={(e) => guarantorRg.onChange(e)}
                                    sx={{ width: 200 }}
                                />
                                <TextField
                                    label="Profissão"
                                    variant="outlined"
                                    value={guarantorProfession.value}
                                    onChange={(e) => guarantorProfession.onChange(e)}
                                    sx={{ width: 200 }}
                                />
                            </Box>
                            <Box sx={{ display: "flex", gap: 2 }}>
                                <TextField
                                    label="Nacionalidade"
                                    variant="outlined"
                                    value={guarantorNationality.value}
                                    onChange={(e) => guarantorNationality.onChange(e)}
                                    sx={{ width: 200 }}
                                />
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={guarantorMaritalStatus?.options}
                                    value={guarantorMaritalStatus.value}
                                    onChange={(e, value) => guarantorMaritalStatus.onChange(value)}
                                    getOptionLabel={(option) => option.name}
                                    renderInput={(params) => <TextField {...params} label="Estado Civil" />}
                                    renderOption={(props, option) => <Box component={'li'} {...props}>{option.name}</Box>}
                                    sx={{ width: 200 }}
                                />
                                <TextField
                                    label="Telefone"
                                    variant="outlined"
                                    value={guarantorPhone.value}
                                    onChange={(e) => guarantorPhone.onChange(e)}
                                    sx={{ width: 200 }}
                                />
                            </Box>
                        </Box>
                        {owner.error && <Alert severity="error">Proprietário - {owner.error}</Alert>}
                        <Button
                            type="submit"
                            variant="contained"
                            onClick={handleSubmit}
                            sx={{ mt: 3, mb: 2, background: '#daa520', color: '#fff', fontWeight: 500, height: 48 }}
                        >
                            Salvar
                        </Button>
                    </Box>
                }
            </Container>
        </Box>
    )
}