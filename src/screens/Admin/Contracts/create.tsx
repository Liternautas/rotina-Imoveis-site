import { useEffect, useState } from "react";
import { CardPropertyH } from "@/src/components/Cards/CardPropertyH";
import { useForm } from "@/src/hooks/useForm";
import { OptionSelectProps, useSelect } from "@/src/hooks/useSelect";
import { IProperty } from "@/src/interfaces";
import { api } from "@/src/services/api";
import { Search } from "@mui/icons-material";
import { Alert, Autocomplete, Box, Button, Container, InputAdornment, IconButton, InputBase, Paper, TextField, Typography } from "@mui/material";

import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

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

export function CreateContracts({ customers, realtors }) {
    const contractType = useSelect();
    const realtor = useSelect();
    const tenent = useSelect();
    const pickup = useSelect();
    const owner = useSelect();
    const code = useForm('number');
    const price = useForm('price');
    const [property, setProperty] = useState<IProperty>(null);
    const [propertyError, setPropertyError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSearchProperty = async () => {
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

    function Label({
        componentName,
        valueType,
        isProOnly,
    }: {
        componentName: string;
        valueType: string;
        isProOnly?: boolean;
    }) {
        const content = (
            <span>
                <strong>{componentName}</strong> for {valueType} editing
            </span>
        );

        if (isProOnly) {
            return (
                <Stack direction="row" spacing={0.5} component="span">
                    <Tooltip title="Included on Pro package">
                        <a href="/x/introduction/licensing/#pro-plan">
                            <span className="plan-pro" />
                        </a>
                    </Tooltip>
                    {content}
                </Stack>
            );
        }

        return content;
    }


    return (
        <Box sx={{
            pt: 3,
            minHeight: '100vh',
            background: `#fafafa`
        }}>
            <Container>
                <Box sx={{ mb: 5 }}>
                    <Typography sx={{ mb: 2 }} variant="h6">O que você deseja fazer?</Typography>
                    <Box sx={{ display: "flex", gap: 2, width: 'fit-content' }}>
                        {contractType.options.map(item => (
                            <Button
                                variant={contractType.value?.id === item.id ? "contained" : "outlined"}
                                sx={{ color: contractType.value?.id === item.id && '#fff' }}
                                onClick={() => contractType.onChange(item)}>
                                {item.name}
                            </Button>
                        ))}
                    </Box>
                </Box>
                {contractType.value &&
                    <Box sx={{ mb: 5, width: 400, display: "flex", flexDirection: "column", gap: 2 }}>
                        <Typography variant="h6">Busque a propriedade</Typography>
                        <Paper
                            component="form"
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
                }
                {property && <CardPropertyH property={property} isLink={false} />}
                {property &&
                    <Box sx={{ mt: 5, width: 400, display: "flex", flexDirection: "column", gap: 2 }}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={pickup?.options}
                            value={pickup.value}
                            onChange={(e, value) => pickup.onChange(value)}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => <TextField {...params} label="Captador" />}
                            renderOption={(props, option) => <Box component={'li'} {...props}>{option.name}</Box>}
                            fullWidth
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
                            fullWidth
                            readOnly
                        />
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={realtor?.options}
                            value={realtor.value}
                            onChange={(e, value) => realtor.onChange(value)}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => <TextField {...params} label="Responsável" />}
                            renderOption={(props, option) => <Box component={'li'} {...props}>{option.name}</Box>}
                            fullWidth
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
                            fullWidth
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoItem
                                component="DateRangePicker"
                            >
                                <DateRangePicker />
                            </DemoItem>
                        </LocalizationProvider>
                        <TextField
                            id="outlined-basic"
                            label="Valor"
                            variant="outlined"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                            }}
                            value={price.value}
                            onChange={(e) => price.onChange(e)}
                        />
                    </Box>
                }
            </Container>
        </Box>
    )
}