import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Alert, Box, IconButton, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { IBanner, ILead } from "@/src/interfaces";
import { MenuComponent } from "../MenuComponent";
import { Download, MoreVert } from "@mui/icons-material";
import { getImageUrl } from "@/src/helpers/functions";
import { MenuBanner } from "../menus/MenuBanner";
import { CardPropertyTable } from "../Cards/CardPropertyTable";
import { MenuLead } from "../menus/MenuLead";

export function TableLeadsAdmin({ leads, action = true, file = false }) {
    const [results, setResults] = useState<ILead[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);



    interface Column {
        id: 'id' | 'actions' | 'phone' | 'name' | 'property' | 'realtor' | 'type' | 'active';
        label: string;
        minWidth?: number;
        align?: 'right';
        format?: (value: number) => string;
    }

    const columns: readonly Column[] = [
        { id: 'name', label: 'Nome', minWidth: 200 },
        { id: 'realtor', label: 'Responsável', minWidth: 200 },
        { id: 'property', label: 'Imóvel', minWidth: 200 },
        { id: 'phone', label: 'Telefone', minWidth: 80 },
        { id: 'type', label: 'Tipo de lead', minWidth: 80 },
        { id: 'actions', label: 'Ações', minWidth: 48 },
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
        { leads && setResults(leads) }
    }, [leads]);

    if (leads.length === 0 || !leads) return (
        <Alert severity="info">Você não possui leads!</Alert>
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
                                                                    <MenuLead id={row.id}>
                                                                        <MoreVert />
                                                                    </MenuLead>

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
                                                case 'name':
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {row.name}
                                                        </TableCell>
                                                    )
                                                case 'phone':
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {row.phone}
                                                        </TableCell>
                                                    )
                                                case 'realtor':
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {row.realtor?.name}
                                                        </TableCell>
                                                    )
                                                case 'type':
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {row.type}
                                                        </TableCell>
                                                    )
                                                case 'property':
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {row.property && <CardPropertyTable property={row.property} />}
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
                count={leads.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={() => { }}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )
}