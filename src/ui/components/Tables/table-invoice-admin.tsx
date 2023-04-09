import { useEffect, useState } from "react";
import { Alert, Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { DialogIcon } from "../DialogIcon";
import { Delete, Download, Edit } from "@mui/icons-material";
import { maskPrice } from "@/src/helpers/mask";
import { useRouter } from "next/router";
import { IInvoice } from "@/src/interfaces";
import { CardPropertyTable } from "../Cards/CardPropertyTable";

export function TableInvoiceAdmin({ invoices, action = true, file = false }) {
    const router = useRouter();
    const [results, setResults] = useState<IInvoice[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    interface Column {
        id: 'id' | 'property' | 'expiration' | 'tenant' | 'locator' | 'status' | 'price' | 'actions' | 'file';
        label: string;
        minWidth?: number;
        align?: 'right';
        format?: (value: number) => string;
    }

    const columns: readonly Column[] = [
        { id: 'property', label: 'Propriedade', minWidth: 200 },
        { id: 'tenant', label: 'Inquilino', minWidth: 200 },
        { id: 'expiration', label: 'Validade', minWidth: 148 },
        { id: 'price', label: 'Preco', minWidth: 148 },
        { id: 'status', label: 'Status', minWidth: 148 },
        { id: 'actions', label: '', minWidth: 100 },
        { id: 'file', label: '', minWidth: 48 },
    ];

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        { invoices && setResults(invoices) }
    }, [invoices]);

    if (invoices.length === 0 || !invoices) return (
        <Alert severity="info">Você não possui faturas em aberto!</Alert>
    )


    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => {
                                switch (column.id) {
                                    case 'actions':
                                        if (action) {
                                            return (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    style={{ minWidth: column.minWidth, background: '#222', color: '#fff' }}
                                                >
                                                    {column.label}
                                                </TableCell>
                                            )
                                        } else return null;
                                    case 'file':
                                        if (file) {
                                            return (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    style={{ minWidth: column.minWidth, background: '#222', color: '#fff' }}
                                                >
                                                    {column.label}
                                                </TableCell>
                                            )
                                        } else return null;
                                    default:
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
                                                    } else return null;
                                                case 'file':
                                                    if (file) {
                                                        return (
                                                            <TableCell>
                                                                <Box>
                                                                    <IconButton>
                                                                        <Download />
                                                                    </IconButton>
                                                                </Box>
                                                            </TableCell>
                                                        )
                                                    } else return null;
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
                                                            <CardPropertyTable property={row.rentalContract.property} />
                                                        </TableCell>
                                                    )
                                                case 'status':
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {row.status}
                                                        </TableCell>
                                                    )
                                                case 'tenant':
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {row.rentalContract.tenant.name}
                                                        </TableCell>
                                                    )
                                                case 'expiration':
                                                    const date = new Date(row.expiration);
                                                    date.setHours(date.getHours() + 3);
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {date.toLocaleDateString()}
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
                count={invoices.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={() => { }}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )
}