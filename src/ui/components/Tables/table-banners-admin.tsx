import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Alert, Box, IconButton, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { IBanner } from "@/src/interfaces";
import { MenuComponent } from "../MenuComponent";
import { Download, MoreVert } from "@mui/icons-material";
import { getImageUrl } from "@/src/helpers/functions";
import { MenuBanner } from "../menus/MenuBanner";

export function TableBannersAdmin({ banners, action = true, file = false }) {
    const [results, setResults] = useState<IBanner[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);



    interface Column {
        id: 'id' | 'actions' | 'file' | 'name' | 'link' | 'path' | 'type' | 'active';
        label: string;
        minWidth?: number;
        align?: 'right';
        format?: (value: number) => string;
    }

    const columns: readonly Column[] = [
        { id: 'active', label: 'Status', minWidth: 56 },
        { id: 'path', label: 'Image', minWidth: 56 },
        { id: 'name', label: 'Nome', minWidth: 200 },
        { id: 'link', label: 'Link', minWidth: 200 },
        { id: 'type', label: 'Tipo', minWidth: 200 },
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
        { banners && setResults(banners) }
    }, [banners]);

    if (banners.length === 0 || !banners) return (
        <Alert severity="info">Você não possui banners!</Alert>
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
                                                                    <MenuBanner id={row.id}>
                                                                        <MoreVert />
                                                                    </MenuBanner>

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
                                                case 'active':
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {row.active ? 'Ativo' : 'Inativo'}
                                                        </TableCell>
                                                    )
                                                case 'name':
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {row.name}
                                                        </TableCell>
                                                    )
                                                case 'type':
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {row.bannerType.name}
                                                        </TableCell>
                                                    )
                                                case 'link':
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {row.link}
                                                        </TableCell>
                                                    )
                                                case 'path':
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {row.path && <Image src={getImageUrl(row.path)} alt="" width={48} height={48}/>}
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
                count={banners.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={() => { }}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )
}