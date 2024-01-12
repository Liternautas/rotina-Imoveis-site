import { IRentalContract } from "@/src/interfaces";
import { Search } from "@mui/icons-material";
import { Container, Box, Typography, Paper, InputBase, IconButton, Button } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useContracts } from "@/src/contexts/ContractsContext";
import { TableRentalAdmin } from "@/src/ui/components/Tables/table-rental-admin";
import { api } from "@/src/services/api";
import { Loading } from "@/src/ui/components/Loading";
import { useForm } from "@/src/hooks/useForm";

interface Props {
    contracts: IRentalContract[];
    totalResults: number;
}

export function Rentals({ contracts, totalResults }: Props) {
    const { rentals, setRentals } = useContracts();
    const router = useRouter();
    const [results, setResults] = useState<IRentalContract[]>(contracts);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(totalResults);
    const [loading, setLoading] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const search = useForm();


    const handleResults = async (page: number) => {
        setLoading(true);
        setPage(page);
        const res = await api.get(`rental-contracts?page=${page}&limit=${rowsPerPage}`).then(res => res.data);
        const { results, total, limit } = res;
        setTotal(total);
        setResults(results);
        setRowsPerPage(limit);
        setLoading(false);
    }

    const handleResultsByCode = async (code: string) => {
        setLoading(true);
        setPage(1);
        const res = await api.get(`rental-contracts?page=${1}&limit=${10}&code=${code}`).then(res => res.data);
        const { results, total, limit } = res;
        setTotal(total);
        setResults(results);
        setRowsPerPage(limit);
        setLoading(false);
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        { contracts && setRentals(contracts) }
    }, [contracts]);

    return (
        <Container maxWidth="xl">
            <Loading open={loading} />
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 1,
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
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', maxWidth: 400 }}
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleResultsByCode(search.value);
                        }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Código do imóvel"
                            inputProps={{ 'aria-label': 'search google maps' }}
                            value={search.value}
                            onChange={search.onChange}
                        />
                        <IconButton
                            type="button"
                            aria-label="search"
                            onClick={() => handleResultsByCode(search.value)}
                        >
                            <Search />
                        </IconButton>
                    </Paper>

                    {/* Modal Create */}
                    <Button variant="contained" sx={{ color: '#fff', p: '10px' }} onClick={() => router.push('/admin/contracts/rentals/create')}>Cadastrar</Button>
                </Box>
            </Box>
            <TableRentalAdmin
                results={results}
                total={total}
                page={page}
                rowsPerPage={rowsPerPage}
                onChange={(page) => handleResults(page)}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Container>
    )
}