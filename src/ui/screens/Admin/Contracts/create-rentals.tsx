import { useEffect, useState } from "react";
import { CardPropertyH } from "@/src/ui/components/Cards/CardPropertyH";
import { useForm } from "@/src/hooks/useForm";
import { OptionSelectProps, useSelect } from "@/src/hooks/useSelect";
import { IProperty, IRentalContract } from "@/src/interfaces";
import { api } from "@/src/services/api";
import { DateRangeOutlined, Search } from "@mui/icons-material";
import { Alert, Autocomplete, Box, Button, Container, InputAdornment, IconButton, InputBase, Paper, TextField, Typography } from "@mui/material";
import DatePicker from "react-datepicker";
import { useContracts } from "@/src/contexts/ContractsContext";

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

export function CreateRentals({ customers, realtors }) {
    const { createRental } = useContracts();
    const contractType = useSelect();
    const realtor = useSelect();
    const tenent = useSelect();
    const pickup = useSelect();
    const owner = useSelect();
    const code = useForm('number');
    const price = useForm('price');
    const [property, setProperty] = useState<IProperty>(null);
    const [propertyError, setPropertyError] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const [loading, setLoading] = useState(false);

    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

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
            locator: {
                id: realtor.value.id.toString()
            },
            owner: {
                id: owner.value.id.toString()
            },
            tenant: {
                id: tenent.value.id.toString()
            },
            start: new Date(startDate),
            end: new Date(endDate),
            price: price.value,
            property: {
                id: property.id
            }
        }
        await createRental(contract);
    }


    useEffect(() => {
        contractType.setOptions(types);
    }, []);

    useEffect(() => {
        { customers && tenent.setOptions(customers) }
    }, [customers]);

    useEffect(() => {
        { realtors && realtor.setOptions(realtors) }
    }, [realtors]);

    useEffect(() => {
        { property && pickup.onChange(property.pickup as OptionSelectProps) }
        { property && owner.onChange(property.owner as OptionSelectProps) }
    }, [property]);

    return (
        <Box sx={{
            pt: 3,
            minHeight: '100vh',
            background: `#fafafa`
        }}>
            <Container>
                <Box sx={{ mb: 5, width: 400, display: "flex", flexDirection: "column", gap: 2 }}>
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
                    <Box sx={{ mt: 5, maxWidth: 720, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2 }}>
                        <Box sx={{ display: "flex", gap: 2 }}>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={pickup?.options}
                                value={pickup.value}
                                onChange={(e, value) => pickup.onChange(value)}
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => <TextField {...params} label="Captador" />}
                                renderOption={(props, option) => <Box component={'li'} {...props}>{option.name}</Box>}
                                sx={{ width: 300 }}
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
                                sx={{ width: 300 }}
                                readOnly
                            />
                        </Box>
                        <Box sx={{ display: "flex", gap: 2 }}>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={realtor?.options}
                                value={realtor.value}
                                onChange={(e, value) => realtor.onChange(value)}
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => <TextField {...params} label="Responsável" />}
                                renderOption={(props, option) => <Box component={'li'} {...props}>{option.name}</Box>}
                                sx={{ width: 300 }}
                            />
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={tenent?.options}
                                value={tenent.value}
                                onChange={(e, value) => tenent.onChange(value)}
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => <TextField {...params} label="Inquilino" />}
                                renderOption={(props, option) => <Box component={'li'} {...props}>{option.name}</Box>}
                                sx={{ width: 300 }}
                            />
                        </Box>
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
                        <Box sx={{ display: "flex", gap: 2 }}>
                            <TextField
                                label="Início"
                                variant="outlined"
                                InputProps={{
                                    readOnly: true,
                                    startAdornment: <InputAdornment position="start"><DateRangeOutlined /></InputAdornment>,
                                }}
                                value={startDate?.toLocaleDateString() ?? ''}
                                onChange={(e) => price.onChange(e)}
                                sx={{ width: 200 }}
                            />
                            <TextField
                                label="Final"
                                variant="outlined"
                                InputProps={{
                                    readOnly: true,
                                    startAdornment: <InputAdornment position="start"><DateRangeOutlined /></InputAdornment>,
                                }}
                                value={endDate?.toLocaleDateString() ?? ''}
                                onChange={(e) => price.onChange(e)}
                                sx={{ width: 200 }}
                            />
                        </Box>
                        <DatePicker
                            selected={startDate}
                            onChange={onChange}
                            startDate={startDate}
                            endDate={endDate}
                            selectsRange
                            inline
                        />
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