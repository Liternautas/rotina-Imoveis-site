import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CardPropertyH } from "@/src/ui/components/Cards/CardPropertyH";
import { useForm } from "@/src/hooks/useForm";
import { OptionSelectProps, useSelect } from "@/src/hooks/useSelect";
import { IProperty, IRentalContract, IUser } from "@/src/interfaces";
import { api } from "@/src/services/api";
import { DateRangeOutlined, DeleteOutline, Download, Remove, Search } from "@mui/icons-material";
import { Alert, Autocomplete, Box, Button, Container, InputAdornment, IconButton, InputBase, Paper, TextField, Typography } from "@mui/material";
import DatePicker from "react-datepicker";
import { useContracts } from "@/src/contexts/ContractsContext";
import { maskPrice } from "@/src/helpers/mask";
import { useAddress } from "@/src/hooks/useAddress";
import { theme } from "@/styles/theme";
import { GalleryRentalContract } from "@/src/ui/components/GalleryRentalContract";

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
        enum: '6'
    },
    {
        id: 1,
        name: '12 meses',
        enum: '12'
    },
    {
        id: 2,
        name: '18 meses',
        enum: '18'
    },
    {
        id: 3,
        name: '24 meses',
        enum: '24'
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
        name: '1',
        enum: '1',
    },
    {
        id: 1,
        name: '2',
        enum: '2',
    },
    {
        id: 2,
        name: '3',
        enum: '3',
    },
    {
        id: 3,
        name: '4',
        enum: '4',
    },
    {
        id: 4,
        name: '5',
        enum: '5',
    },
    {
        id: 5,
        name: '6',
        enum: '6',
    },
    {
        id: 6,
        name: '7',
        enum: '7',
    },
    {
        id: 7,
        name: '8',
        enum: '8',
    },
    {
        id: 8,
        name: '9',
        enum: '9',
    },
    {
        id: 9,
        name: '10',
        enum: '10'
    },
    {
        id: 10,
        name: '11',
        enum: '11'
    },
    {
        id: 11,
        name: '12',
        enum: '12'
    },
    {
        id: 12,
        name: '13',
        enum: '13'
    },
    {
        id: 13,
        name: '14',
        enum: '14'
    },
    {
        id: 14,
        name: '15',
        enum: '15'
    },
    {
        id: 15,
        name: '16',
        enum: '16'
    },
    {
        id: 16,
        name: '17',
        enum: '17'
    },
    {
        id: 17,
        name: '18',
        enum: '18'
    },
    {
        id: 18,
        name: '19',
        enum: '19'
    },
    {
        id: 19,
        name: '20',
        enum: '20'
    },
    {
        id: 20,
        name: '21',
        enum: '21'
    },
    {
        id: 21,
        name: '22',
        enum: '22'
    },
    {
        id: 22,
        name: '23',
        enum: '23'
    },
    {
        id: 23,
        name: '24',
        enum: '24'
    },
    {
        id: 24,
        name: '25',
        enum: '25'
    },
    {
        id: 25,
        name: '26',
        enum: '26'
    },
    {
        id: 26,
        name: '27',
        enum: '27'
    },
    {
        id: 27,
        name: '28',
        enum: '28'
    },
    {
        id: 28,
        name: '29',
        enum: '29'
    },
    {
        id: 29,
        name: '30',
        enum: '30'
    },
    {
        id: 30,
        name: '31',
        enum: '31'
    },
]

interface Props {
    customers: IUser[];
    realtors: IUser[];
    owners: IUser[];
    contract: IRentalContract;
}

export function UpdateRentals({ customers, realtors, contract, owners }: Props) {
    const { updateRental, generateDocument, setImages, documentPath, setDocumentPath } = useContracts();
    const router = useRouter();
    const { id } = router.query;
    const address = useAddress();
    const { city, state } = address;

    const contractType = useSelect();
    const realtor = useSelect();
    const tenant = useSelect();
    const pickup = useSelect();
    const duration = useSelect();
    const maritalStatus = useSelect();
    const paymentLimit = useSelect();
    const owner = useSelect();

    const code = useForm('number');
    const price = useForm('price');
    const shorts = useForm('price');
    const cpf = useForm('cpf');
    const rg = useForm('rg');
    const profession = useForm();
    const nationality = useForm();


    const [property, setProperty] = useState<IProperty>(null);
    const [propertyError, setPropertyError] = useState(false);
    const startDate = useForm();
    const endDate = useForm();
    const signatureDate = useForm();

    const guarantorName = useForm();
    const guarantorEmail = useForm('email');
    const guarantorCpf = useForm('cpf');
    const guarantorRg = useForm('rg');
    const guarantorProfession = useForm();
    const guarantorNationality = useForm();
    const guarantorPhone = useForm('phone');
    const guarantorMaritalStatus = useSelect(maritalsStatus);

    const getValue = (value: string) => value && value != '' ? value : null;

    const handleSubmit = async () => {
        const contract: IRentalContract = {
            id: +id,
            owner: {
                id: owner.value.id.toString()
            },
            tenant: {
                id: tenant.value.id.toString()
            },
            signatureDate: new Date(signatureDate.value),
            start: new Date(startDate.value),
            end: new Date(endDate.value),
            price: price.value,
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
            guarantorMaritalStatus: getValue(guarantorMaritalStatus.value?.enum),
            guarantorName: getValue(guarantorName.value),
            guarantorNationality: getValue(guarantorNationality.value),
            guarantorPhone: getValue(guarantorPhone.value),
            guarantorProfession: getValue(guarantorProfession.value),
            guarantorRg: getValue(guarantorRg.value)
        }
        await updateRental(contract);
    }
    const handleGenerateDocument = async () => {
        await generateDocument(+id);
    }

    const downloadArquivo = async (path: string) => {
        const link = document.createElement('a');
        link.href = process.env.NEXT_PUBLIC_BASE_URL + path;
        link.setAttribute('download', 'contrato.pdf');
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
        document.body.appendChild(link);
        link.click();
    };

    useEffect(() => {
        contractType.setOptions(types);
        duration.setOptions(durations);
        maritalStatus.setOptions(maritalsStatus);
        paymentLimit.setOptions(paymentLimits);
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
        { property && property.pickup && pickup.onChange(property.pickup as OptionSelectProps) }
        { property && property.owner && owner.onChange(property.owner as OptionSelectProps) }
    }, [property]);

    useEffect(() => {
        if (contract) {
            setProperty(contract.property);
            { contract.property && pickup.onChange(contract.property.pickup as OptionSelectProps) }
            { contract.owner && owner.onChange(contract.owner as OptionSelectProps) }
            { contract.locator && realtor.onChange(contract.locator as OptionSelectProps) }
            { contract.tenant && tenant.onChange(contract.tenant as OptionSelectProps) }
            { contract.price && price.setValue(maskPrice(contract.price)) }
            { contract.shorts && shorts.setValue(maskPrice(contract.shorts)) }
            const start = new Date(contract.start.toString().split('T')[0]);
            start.setHours(start.getHours() + 4);
            const startStr = start.toLocaleDateString().split('/');
            const end = new Date(contract.end.toString().split('T')[0]);
            end.setHours(end.getHours() + 4);
            const endStr = end.toLocaleDateString().split('/');
            if (contract.signatureDate) {
                const signature = new Date(contract.signatureDate.toString().split('T')[0]);
                signature.setHours(end.getHours() + 4);
                const signatureStr = signature.toLocaleDateString().split('/');
                { contract.signatureDate && signatureDate.setValue(`${signatureStr[2]}-${signatureStr[1]}-${signatureStr[0]}`) }
            }
            { contract.start && startDate.setValue(`${startStr[2]}-${startStr[1]}-${startStr[0]}`) }
            { contract.end && endDate.setValue(`${endStr[2]}-${endStr[1]}-${endStr[0]}`) }
            { contract.cpf && cpf.setValue(contract.cpf) }
            { contract.rg && rg.setValue(contract.rg) }
            { contract.profession && profession.setValue(contract.profession) }
            { contract.nationality && nationality.setValue(contract.nationality) }
            { contract.maritalStatus && maritalStatus.onChange(maritalsStatus.find(item => item.enum === contract.maritalStatus)) }
            { contract?.address?.state && state.onChange(contract.address.state) }
            { contract?.address?.city && city.onChange(contract.address.city) }
            { contract.paymentLimit && paymentLimit.onChange(paymentLimits.find(item => +item.enum === contract.paymentLimit)) }
            { contract.duration && duration.onChange(durations.find(item => +item.enum === contract.duration)) }
            { contract.document && setDocumentPath(contract.document) }
            { contract.images && setImages(contract.images) }

            { contract.guarantorName && guarantorName.setValue(contract.guarantorName) }
            { contract.guarantorEmail && guarantorEmail.setValue(contract.guarantorEmail) }
            { contract.guarantorPhone && guarantorPhone.setValue(contract.guarantorPhone) }
            { contract.guarantorCpf && guarantorCpf.setValue(contract.guarantorCpf) }
            { contract.guarantorRg && guarantorRg.setValue(contract.guarantorRg) }
            { contract.guarantorNationality && guarantorNationality.setValue(contract.guarantorNationality) }
            { contract.guarantorProfession && guarantorProfession.setValue(contract.guarantorProfession) }
            { contract.guarantorMaritalStatus && guarantorMaritalStatus.onChange(maritalsStatus.find(item => item.enum === contract.guarantorMaritalStatus)) }
        }
    }, [contract]);

    return (
        <Box sx={{
            pt: 3,
            minHeight: '100vh',
            background: `#fafafa`
        }}>
            <Container>
                <Box sx={{ mb: 3, width: 400, display: "flex", flexDirection: "column", gap: 2 }}>
                    <Typography variant="h2" sx={{
                        fontSize: 24,
                        fontWeight: 600,
                    }}>Cadastrar Contrato de Locação</Typography>
                </Box>
                <Box sx={{ width: "fit-content" }}>
                    {property && <CardPropertyH property={property} isLink={false} />}
                </Box>
                {property &&
                    <Box sx={{ maxWidth: 720, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2 }}>
                        
                        {/* Dados do Contrato */}
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
                                    sx={{ flex: 1}}
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
                            <Box sx={{ display: "flex", gap: 2 }}>
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
                            </Box>
                        </Box>

                        {/* Dados do Inquilino */}
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

                        {/* Dados do Fiador */}
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

                        {/* Documentos */}
                        <Box sx={{ mt: 5, maxWidth: 720, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2 }}>
                            <Box>
                                <Typography variant="h6">Documentos</Typography>
                                <Typography variant="subtitle1">Certifique de salvar as alterações antes de gerar o documento.</Typography>
                            </Box>
                            {documentPath &&
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                }}
                                >
                                    <Button variant="contained" sx={{
                                        display: 'flex',
                                        gap: 1,
                                        height: 48,
                                        background: theme.palette.secondary.main,
                                        color: '#fff',
                                        ":hover": {
                                            background: theme.palette.secondary.dark,
                                        }
                                    }} onClick={() => downloadArquivo(documentPath)}>
                                        <Download />
                                        Baixar Documento
                                    </Button>
                                </Box>
                            }
                            <Box sx={{ display: "flex", gap: 2 }}>
                                <Button
                                    type="submit"
                                    variant="outlined"
                                    onClick={handleGenerateDocument}
                                    sx={{ fontWeight: 500, height: 48 }}
                                >
                                    Gerar Documento
                                </Button>
                            </Box>
                            <GalleryRentalContract />
                        </Box>

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