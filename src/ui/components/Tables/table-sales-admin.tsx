import { useEffect, useState } from "react";
import { Alert, Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { DialogIcon } from "../DialogIcon";
import { Delete, Edit } from "@mui/icons-material";
import { maskPrice } from "@/src/helpers/mask";
import { useRouter } from "next/router";
import { ISalesContract } from "@/src/interfaces";
import { formatDate } from "@/src/helpers/date";
import { CardPropertyTable } from "../Cards/CardPropertyTable";
import { useContracts } from "@/src/contexts/ContractsContext";

export function TableSalesAdmin({ contracts, action = true }) {
    const router = useRouter();
    const [results, setResults] = useState<ISalesContract[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const {removeSales} = useContracts();

    interface Column {
        id: 'id' | 'property' | 'buyer' | 'seller' | 'date' | 'price' | 'actions';
        label: string;
        minWidth?: number;
        align?: 'right';
        format?: (value: number) => string;
    }

    const columns: readonly Column[] = [
        { id: 'property', label: 'Propriedade', minWidth: 200 },
        { id: 'buyer', label: 'Comprador', minWidth: 170 },
        { id: 'seller', label: 'Vendedor', minWidth: 170 },
        { id: 'date', label: 'Data', minWidth: 100 },
        { id: 'price', label: 'Preço', minWidth: 100 },
        { id: 'actions', label: 'Ações', minWidth: 100 },
    ];

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleRemove = async (id: number) => {
        await removeSales(id);
    }

    useEffect(() => {
        { contracts && setResults(contracts) }
    }, [contracts]);

    if (contracts.length === 0 || !contracts) return (
        <Alert severity="info">Você ainda não possui contratos de compras de imóveis!</Alert>
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
                                                    if (action) {
                                                        return (
                                                            <TableCell>
                                                                <Box>
                                                                    <DialogIcon
                                                                        title="Remover contrato"
                                                                        description="Deseja mesmo remover esse contrato?"
                                                                        onSubmit={() => handleRemove(row.id)}
                                                                    >
                                                                        <Delete />
                                                                    </DialogIcon>
                                                                    <IconButton onClick={() => router.push(`/admin/collaborators/edit/${row.id}`)}>
                                                                        <Edit />
                                                                    </IconButton>
                                                                </Box>
                                                            </TableCell>
                                                        )
                                                    } else {
                                                        return null;
                                                    }
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
                                                            <CardPropertyTable property={row.property}/>
                                                        </TableCell>
                                                    )
                                                case 'buyer':
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {row.buyer.name}
                                                        </TableCell>
                                                    )
                                                case 'seller':
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {row.seller.name}
                                                        </TableCell>
                                                    )
                                                case 'date':
                                                    const date = new Date(row.date);
                                                    date.setHours(date.getHours() + 3);
                                                    console.log(date.toLocaleDateString());
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {formatDate(date)}
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