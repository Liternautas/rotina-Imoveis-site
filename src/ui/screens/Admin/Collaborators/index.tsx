import dynamic from "next/dynamic";
import { DialogIcon } from "@/src/ui/components/DialogIcon";
import { ModalAddUser } from "@/src/ui/components/modals/ModalAddUser";
import { useUser } from "@/src/contexts/UserContext";
import { Delete, Edit } from "@mui/icons-material";


import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Box = dynamic(() => import('@mui/material/Box'), {
    loading: () => <p>Loading...</p>,
});
const Container = dynamic(() => import('@mui/material/Container'), {
    loading: () => <p>Loading...</p>,
});
const IconButton = dynamic(() => import('@mui/material/IconButton'), {
    loading: () => <p>Loading...</p>,
});
const Paper = dynamic(() => import('@mui/material/Paper'), {
    loading: () => <p>Loading...</p>,
});
const Table = dynamic(() => import('@mui/material/Table'), {
    loading: () => <p>Loading...</p>,
});
const TableCell = dynamic(() => import('@mui/material/TableCell'), {
    loading: () => <p>Loading...</p>,
});
const TableContainer = dynamic(() => import('@mui/material/TableContainer'), {
    loading: () => <p>Loading...</p>,
});
const TableHead = dynamic(() => import('@mui/material/TableHead'), {
    loading: () => <p>Loading...</p>,
});
const TablePagination = dynamic(() => import('@mui/material/TablePagination'), {
    loading: () => <p>Loading...</p>,
});
const TableRow = dynamic(() => import('@mui/material/TableRow'), {
    loading: () => <p>Loading...</p>,
});
const TableBody = dynamic(() => import('@mui/material/TableBody'), {
    loading: () => <p>Loading...</p>,
});

export function Collaborators({ users }) {
    const { results, setResults, remove } = useUser();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const router = useRouter();

    const handleRemove = async (id: string) => {
        await remove(id);
    };

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
            setResults(users);
        }
    }, [users]);

    return (
        <Container>
            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                mb: 2,
                overflow: 'auto'
            }}>
                <ModalAddUser />
            </Box>
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
                    rowsPerPageOptions={[10, 25, 100]}
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={() => { }}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Container>
    )
}