import {useRouter} from "next/router";
import { Search } from "@mui/icons-material";
import { Box, Button, Container, IconButton, InputBase, Paper, Typography } from "@mui/material";
import { TableInvoiceAdmin } from "@/src/ui/components/Tables/table-invoice-admin";
import { IBanner, IInvoice } from "@/src/interfaces";
import { useInvoices } from "@/src/contexts/InvoicesContext";
import { useEffect } from "react";
import { useBanners } from "@/src/contexts/BannersContext";
import { TableBannersAdmin } from "@/src/ui/components/Tables/table-banners-admin";

interface Props {
    banners?: IBanner[];
    total?: number;
}

export function Banners({banners, total}: Props) {
    const {results, setResults} = useBanners();
    const router = useRouter();

    useEffect(() => {
        {banners && setResults(banners)}
    }, [banners]);

    return (
        <Container maxWidth="xl">
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 2
            }}>
                <Typography variant="h6" fontWeight={600}>Banners</Typography>
                <Box sx={{
                    display: 'flex',
                    gap: 1
                }}>
                    {/* Input Filter */}
                    <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Código do imóvel"
                            inputProps={{ 'aria-label': 'search google maps' }}
                        />
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                            <Search />
                        </IconButton>
                    </Paper>

                    {/* Modal Create */}
                    <Button 
                    variant="contained" 
                    sx={{
                        color: '#fff'
                    }}
                    onClick={() => router.push('/admin/banners/create')}
                    >Cadastrar</Button>
                </Box>
            </Box>
            <TableBannersAdmin banners={results} action={true}/>
        </Container>
    )    
}