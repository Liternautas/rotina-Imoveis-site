import dynamic from "next/dynamic";
import { DialogIcon } from "@/src/ui/components/DialogIcon";
import { ModalAddUser } from "@/src/ui/components/modals/ModalAddUser";
import { useUser } from "@/src/contexts/UserContext";
import { Delete, Edit } from "@mui/icons-material";


import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { api } from "@/src/services/api";
import { Loading } from "@/src/ui/components/Loading";

const Box = dynamic(() => import('@mui/material/Box'), {
    loading: () => null,
});
const Container = dynamic(() => import('@mui/material/Container'), {
    loading: () => null,
});
const IconButton = dynamic(() => import('@mui/material/IconButton'), {
    loading: () => null,
});
const Paper = dynamic(() => import('@mui/material/Paper'), {
    loading: () => null,
});
const Table = dynamic(() => import('@mui/material/Table'), {
    loading: () => null,
});
const TableCell = dynamic(() => import('@mui/material/TableCell'), {
    loading: () => null,
});
const TableContainer = dynamic(() => import('@mui/material/TableContainer'), {
    loading: () => null,
});
const TableHead = dynamic(() => import('@mui/material/TableHead'), {
    loading: () => null,
});
const TablePagination = dynamic(() => import('@mui/material/TablePagination'), {
    loading: () => null,
});
const TableRow = dynamic(() => import('@mui/material/TableRow'), {
    loading: () => null,
});
const TableBody = dynamic(() => import('@mui/material/TableBody'), {
    loading: () => null,
});

export function Collaborators({ users, title = 'Users', total }) {
    const { results, setResults, remove } = useUser();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const router = useRouter();

    const handleRemove = async (id: string) => {
        await remove(id);
    };

    const handleResults = async (page: number) => {
        setLoading(true);
        setPage(page);
        const { results, total, limit } = await api.get(`users/customers?page=${page}&limit=${rowsPerPage}`).then(res => res.data);
        setResults(results);
        setRowsPerPage(limit);
        setLoading(false);
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    interface Column {
        id: 'name' | 'email' | 'phone' | 'avatar' | 'role' | 'actions';
        label: string;
        minWidth?: number;
        align?: 'right';
        format?: (value: number) => string;
    }

    const columns: readonly Column[] = [
        { id: 'name', label: 'Nome', minWidth: 170 },
        { id: 'email', label: 'Email', minWidth: 170 },
        { id: 'phone', label: 'Telefone', minWidth: 100 },
        { id: 'role', label: 'Função', minWidth: 100 },
        { id: 'actions', label: 'Ações', minWidth: 100 },
    ];

    useEffect(() => {
        if (users) {
            console.log(users)
            setResults(users);
        }
    }, [users]);

    return (
        <Container>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 2,
                overflow: 'auto'
            }}>
                <Typography>{title}</Typography>
                <ModalAddUser />
            </Box>
            <Loading open={loading}/>
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
                            {results.map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                if (column.id === 'actions') {
                                                    return (
                                                        <TableCell>
                                                            <Box>
                                                                <DialogIcon
                                                                    title="Remover usuário"
                                                                    description="Deseja mesmo remover esse usuário?"
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
                    rowsPerPageOptions={[15]}
                    count={total}
                    rowsPerPage={rowsPerPage}
                    page={page - 1}
                    onPageChange={(e, page) => handleResults(page + 1)}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Container>
    )
}