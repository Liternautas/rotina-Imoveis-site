import { useEffect, useState } from "react";
import { Alert, Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { DialogIcon } from "../DialogIcon";
import { Delete, Edit } from "@mui/icons-material";
import { maskPrice } from "@/src/helpers/mask";
import { useRouter } from "next/router";
import { IRentalContract } from "@/src/interfaces";

export function TableRentalAdmin({ contracts, action = true }) {
    const router = useRouter();
    const [results, setResults] = useState<IRentalContract[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    interface Column {
        id: 'id' | 'property' | 'locator' | 'tenant' | 'start' | 'end' | 'price' | 'actions';
        label: string;
        minWidth?: number;
        align?: 'right';
        format?: (value: number) => string;
    }

    const columns: readonly Column[] = [
        { id: 'property', label: 'Propriedade', minWidth: 200 },
        { id: 'locator', label: 'Comprador', minWidth: 170 },
        { id: 'tenant', label: 'Vendedor', minWidth: 170 },
        { id: 'start', label: 'Início', minWidth: 100 },
        { id: 'end', label: 'Fim', minWidth: 100 },
        { id: 'price', label: 'Preço', minWidth: 100 },
        { id: 'actions', label: 'Ações', minWidth: 100 },
    ];

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        { contracts && setResults(contracts) }
    }, [contracts]);

    if(contracts.length === 0 || !contracts) return (
        <Alert severity="info">Você ainda não possui contratos de locações de imóveis!</Alert>
    )

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => {
                                if (action && column.id === 'actions') {
                                    return (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth, background: '#222', color: '#fff' }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    )
                                } else if (!(column.id === 'actions')) {
                                    return (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth, background: '#222', color: '#fff' }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    )
                                }
                            })}
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
                                            switch (column.id) {
                                                case 'actions':
                                                    return (
                                                        <TableCell>
                                                            <Box>
                                                                <DialogIcon
                                                                    title="Remover usuário"
                                                                    description="Deseja mesmo remover esse usuário?"
                                                                    onSubmit={() => /* handleRemove(row.id) */null}
                                                                >
                                                                    <Delete />
                                                                </DialogIcon>
                                                                <IconButton onClick={() => router.push(`/admin/collaborators/edit/${row.id}`)}>
                                                                    <Edit />
                                                                </IconButton>
                                                            </Box>
                                                        </TableCell>
                                                    )
                                                case 'id':
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format && typeof value === 'number'
                                                                ? column.format(value)
                                                                : value}
                                                        </TableCell>
                                                    )
                                                case 'property':
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {row.property.code}
                                                        </TableCell>
                                                    )
                                                case 'locator':
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {row.locator.name}
                                                        </TableCell>
                                                    )
                                                case 'tenant':
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {row.tenant.name}
                                                        </TableCell>
                                                    )
                                                case 'start':
                                                    const date = new Date(row.start);
                                                    date.setHours(date.getHours() + 3);
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {date.toLocaleDateString()}
                                                        </TableCell>
                                                    )
                                                case 'end':
                                                    const end = new Date(row.end);
                                                    end.setHours(end.getHours() + 3);
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {end.toLocaleDateString()}
                                                        </TableCell>
                                                    )
                                                case 'price':
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            R$ {maskPrice(row.price)}
                                                        </TableCell>
                                                    )
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
                count={contracts.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={() => { }}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )
} 