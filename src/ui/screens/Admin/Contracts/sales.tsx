import { DialogIcon } from "@/src/ui/components/DialogIcon";
import { maskPrice } from "@/src/helpers/mask";
import { ISalesContract } from "@/src/interfaces";
import { Delete, Edit, Search } from "@mui/icons-material";
import { Container, Box, Typography, Paper, InputBase, IconButton, Divider, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TableSalesAdmin } from "@/src/ui/components/Tables/table-sales-admin";
import { useContracts } from "@/src/contexts/ContractsContext";

interface Props {
    contracts: ISalesContract[];
}

export function Sales({ contracts }: Props) {
    const router = useRouter();
    const {sales, setSales} = useContracts();

    useEffect(() => {
        { contracts && setSales(contracts) }
    }, [contracts]);

    return (
        <Container maxWidth="xl">
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 2
            }}>
                <Typography variant="h6" fontWeight={600}>Contratos de vendas</Typography>
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
                    <Button variant="contained" sx={{ color: '#fff', p: '10px' }} onClick={() => router.push('/admin/contracts/sales/create')}>Cadastrar</Button>
                </Box>
            </Box>
            <TableSalesAdmin contracts={sales}/>
        </Container>
    )
}