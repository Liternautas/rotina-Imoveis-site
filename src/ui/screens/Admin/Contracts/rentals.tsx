import { IRentalContract } from "@/src/interfaces";
import { Search } from "@mui/icons-material";
import { Container, Box, Typography, Paper, InputBase, IconButton, Button } from "@mui/material";
import { useRouter } from "next/router";
import {useEffect, useState} from "react";
import { useContracts } from "@/src/contexts/ContractsContext";
import { TableRentalAdmin } from "@/src/ui/components/Tables/table-rental-admin";

interface Props {
    contracts: IRentalContract[];
}

export function Rentals({contracts}: Props) {
    const {rentals, setRentals} = useContracts();
    const router = useRouter();

    useEffect(() => {
        { contracts && setRentals(contracts) }
    }, [contracts]);

    return (
        <Container maxWidth="xl">
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 2
            }}>
                <Typography variant="h6" fontWeight={600}>Contratos de aluguel</Typography>
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
                        <IconButton type="button" aria-label="search">
                            <Search />
                        </IconButton>
                    </Paper>

                    {/* Modal Create */}
                    <Button variant="contained" sx={{ color: '#fff', p: '10px' }} onClick={() => router.push('/admin/contracts/rentals/create')}>Cadastrar</Button>
                </Box>
            </Box>
            <TableRentalAdmin contracts={rentals}/>
        </Container>
    )
}