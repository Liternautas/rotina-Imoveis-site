import React, { useEffect, useState } from "react";
import { Alert, Box, IconButton, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { DialogIcon } from "../DialogIcon";
import { Cancel, CancelOutlined, Check, Delete, DeleteOutline, Download, Edit, EditOutlined, MoreVert } from "@mui/icons-material";
import { maskPrice } from "@/src/helpers/mask";
import { useRouter } from "next/router";
import { IInvoice } from "@/src/interfaces";
import { CardPropertyTable } from "../Cards/CardPropertyTable";
import { InvoiceStatus, useInvoices } from "@/src/contexts/InvoicesContext";
import { formatDate } from "@/src/helpers/date";
import { DialogComponent } from "../DialogComponent";
import { ModalPayInvoice } from "../modals/ModalPayInvoice";
import { MenuComponent } from "../MenuComponent";

export function TableInvoiceAdmin({ invoices, action = true, file = false }) {
    const { remove, chanceStatus, payInvoice } = useInvoices();
    const router = useRouter();
    const [results, setResults] = useState<IInvoice[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [openActions, setOpenActions] = useState(false);



    interface Column {
        id: 'id' | 'property' | 'expiration' | 'tenant' | 'locator' | 'status' | 'price' | 'actions' | 'file' | 'payment';
        label: string;
        minWidth?: number;
        align?: 'right';
        format?: (value: number) => string;
    }

    const columns: readonly Column[] = [
        { id: 'property', label: 'Propriedade', minWidth: 200 },
        { id: 'tenant', label: 'Inquilino', minWidth: 200 },
        { id: 'expiration', label: 'Validade', minWidth: 100 },
        { id: 'payment', label: 'Pagamento', minWidth: 100 },
        { id: 'price', label: 'Preco', minWidth: 148 },
        { id: 'status', label: 'Status', minWidth: 100 },
        { id: 'actions', label: '', minWidth: 48 },
        { id: 'file', label: '', minWidth: 48 },
    ];

    const downloadArquivo = async (path: string) => {
        const link = document.createElement('a');
        link.href = process.env.NEXT_PUBLIC_BASE_URL + path;
        link.setAttribute('download', 'segunda-via.pdf');
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
        document.body.appendChild(link);
        link.click();
    };

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
                                                                    <MenuComponent id={row.id}>
                                                                        <MoreVert />
                                                                    </MenuComponent>

                                                                </Box>
                                                            </TableCell>
                                                        )
                                                    } else return null;
                                                case 'file':
                                                    if (file) {
                                                        return (
                                                            <TableCell>
                                                                <Box>
                                                                    <IconButton onClick={() => downloadArquivo(row.path)}>
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
                                                            {row.status === 'pendente' &&
                                                                <Alert icon={false} severity="warning">
                                                                    Pendente
                                                                </Alert>
                                                            }
                                                            {row.status === 'pago' &&
                                                                <Alert icon={false} severity="success">
                                                                    Pago
                                                                </Alert>
                                                            }
                                                            {row.status === 'vencida' &&
                                                                <Alert icon={false} severity="error">
                                                                    Vencida
                                                                </Alert>
                                                            }
                                                            {row.status === 'cancelada' &&
                                                                <Alert icon={false} severity="error">
                                                                    Cancelada
                                                                </Alert>
                                                            }
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
                                                            {formatDate(date)}
                                                        </TableCell>
                                                    )
                                                case 'payment':
                                                    const payment = new Date(row.payment);
                                                    payment?.setHours(payment.getHours() + 3);
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {row.payment && formatDate(payment)}
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