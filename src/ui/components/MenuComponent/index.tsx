import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import { ModalPayInvoice } from "../modals/ModalPayInvoice";
import { DialogComponent } from "../DialogComponent";
import { CancelOutlined, Check, DeleteOutline, EditOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useState } from "react";
import { InvoiceStatus, useInvoices } from "@/src/contexts/InvoicesContext";

export function MenuComponent({ children, id }) {
    const {remove, chanceStatus, payInvoice} = useInvoices()
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleRemove = async (id: string) => {
        await remove(id);
    }

    const handleChangeStatus = async (id: string, status: InvoiceStatus) => {
        await chanceStatus(id, status);
    }
    
    const handlePayInvoice = async (id: string, date: Date, file?: File) => {
        await payInvoice(id, date, file);
    }

    return (
        <>
            <IconButton onClick={handleClick}>
                {children}
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: 300,
                        width: '20ch',
                    },
                }}
            >
                <ModalPayInvoice onSubmit={(date, file) => handlePayInvoice(id, new Date(date), file)}>
                    <MenuItem>
                        <Check sx={{ mr: 2, color: '#555' }} />
                        Quitar fatura
                    </MenuItem>
                </ModalPayInvoice>
                <DialogComponent
                    title="Cancelar fatura"
                    description="Deseja mesmo cancelar essa fatura?"
                    onSubmit={() => handleChangeStatus(id, 'cancelada')}
                >
                    <MenuItem>
                        <CancelOutlined sx={{ mr: 2, color: '#555' }} />
                        Cancelar fatura
                    </MenuItem>
                </DialogComponent>
                <MenuItem onClick={() => router.push(`/admin/contracts/boletos/edit/${id}`)}>
                    <EditOutlined sx={{ mr: 2, color: '#555' }} />
                    Editar fatura
                </MenuItem>
                <DialogComponent
                    title="Deletar fatura"
                    description="Deseja mesmo deletar essa fatura?"
                    onSubmit={() => handleRemove(id)}
                >
                    <MenuItem>
                        <DeleteOutline sx={{ mr: 2, color: '#555' }} />
                        Deletar fatura
                    </MenuItem>
                </DialogComponent>
            </Menu>
        </>
    )
}