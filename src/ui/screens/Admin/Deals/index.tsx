import { DialogIcon } from "@/src/ui/components/DialogIcon";
import { ModalAddDeals } from "@/src/ui/components/modals/ModalAddDeals";
import { Delete, Edit, FilterListOutlined, Search, Preview } from "@mui/icons-material";
import { Avatar, Box, Button, Container, Divider, Grid, IconButton, InputBase, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

const data = [
    {
        id: '0',
        customer: {
            id: 0,
            name: 'Yasmim Lopes',
            email: 'yasmim.lopes@gmail.com'
        },
        responsible: {
            id: 0,
            name: 'Ezequiel Pires',
            email: 'ezequiel.pires082000@gmail.com'
        },
        property: {
            id: 0,
            title: 'Casa à venda no Ipanema',
            code: '2514',
            price: 'R$ 255.000,00'
        },
        step: 'Interesse',
        adType: 'Aluguel'
    },
    {
        id: '1',
        customer: {
            id: 0,
            name: 'Wilmar Correia',
            email: 'wilmar.correia@gmail.com'
        },
        responsible: {
            id: 0,
            name: 'Ezequiel Pires',
            email: 'ezequiel.pires082000@gmail.com'
        },
        property: {
            id: 0,
            title: 'Casa à venda no Ipanema',
            code: '2514',
            price: 'R$ 255.000,00'
        },
        step: 'Interesse',
        adType: 'Aluguel'
    }
]

export function Deals() {
    const [results, setResults] = useState(data);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const router = useRouter();

    const handleRemove = async (id: string) => {
        //await remove(id);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    interface Column {
        id: 'name' | 'responsible' | 'customer' | 'property' | 'adType' | 'step' | 'email' | 'phone' | 'avatar' | 'role' | 'actions';
        label: string;
        minWidth?: number;
        align?: 'right';
        format?: (value: number) => string;
    }

    const columns: readonly Column[] = [
        { id: 'customer', label: 'Cliente', minWidth: 170 },
        { id: 'responsible', label: 'Responsável', minWidth: 170 },
        { id: 'adType', label: 'Interesse', minWidth: 100 },
        { id: 'step', label: 'Etapa', minWidth: 100 },
        { id: 'property', label: 'Imóvel', minWidth: 100 },
        { id: 'actions', label: 'Ações', minWidth: 100 },
    ];


    return (
        <Container>
            {/* Header Component */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 2
            }}>
                <Typography variant="h6" fontWeight={600}>Negócios</Typography>
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
                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                        <IconButton sx={{ p: '10px' }} aria-label="directions">
                            <FilterListOutlined />
                        </IconButton>
                    </Paper>

                    {/* Modal Create */}
                    <ModalAddDeals />
                </Box>
            </Box>

            {/* Table Component */}
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth, background: '#222', color: '#fff' }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {results
                                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                if (column.id === 'actions') {
                                                    return (
                                                        <TableCell>
                                                            <Box>
                                                                <IconButton onClick={() => router.push(`/admin/collaborators/edit/${row.id}`)}>
                                                                    <Preview />
                                                                </IconButton>
                                                                <DialogIcon
                                                                    title="Remover usuário"
                                                                    description="Deseja mesmo remover esse usuário?"
                                                                    onSubmit={() => handleRemove(row.id)}
                                                                >
                                                                    <Delete />
                                                                </DialogIcon>
                                                            </Box>
                                                        </TableCell>
                                                    )
                                                } else if (column.id === "customer" || column.id === "responsible") {
                                                    return (
                                                        <TableCell>
                                                            <Box sx={{ display: "flex", alignItems: 'center', gap: 1 }}>
                                                                <Avatar>{value.name.substring(0, 1)}</Avatar>
                                                                {value.name}
                                                            </Box>
                                                        </TableCell>
                                                    )
                                                } else if (column.id === "property") {
                                                    return (
                                                        <TableCell>
                                                            <Box sx={{ display: "flex", alignItems: 'center', gap: 1 }}>
                                                                Cod.: {value.code}
                                                            </Box>
                                                        </TableCell>
                                                    )
                                                } else {
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format && typeof value === 'number'
                                                                ? column.format(value)
                                                                : value}
                                                        </TableCell>
                                                    );
                                                }
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={results.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={() => { }}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Container>
    )
}