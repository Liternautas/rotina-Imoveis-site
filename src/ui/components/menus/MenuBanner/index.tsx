import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import { ModalPayInvoice } from "../../modals/ModalPayInvoice";
import { DialogComponent } from "../../DialogComponent";
import { CancelOutlined, Check, DeleteOutline, EditOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useState } from "react";
import { InvoiceStatus, useInvoices } from "@/src/contexts/InvoicesContext";
import { useBanners } from "@/src/contexts/BannersContext";

export function MenuBanner({ children, id }) {
    const { remove } = useBanners()
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleRemove = async (id: number) => {
        await remove(id);
    }

    /* const handleChangeStatus = async (id: string, status: InvoiceStatus) => {
        await chanceStatus(id, status);
    }

    const handlePayInvoice = async (id: string, date: Date) => {
        await payInvoice(id, date);
    } */

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
                    },
                }}
            >
                <DialogComponent
                    title="Desativar banner"
                    description="Deseja mesmo desativar esse banner?"
                    //onSubmit={() => handleChangeStatus(id, 'cancelada')}
                >
                    <MenuItem>
                        <CancelOutlined sx={{ mr: 2, color: '#555' }} />
                        Desativar banner
                    </MenuItem>
                </DialogComponent>
                <MenuItem onClick={() => router.push(`/admin/banners/edit/${id}`)}>
                    <EditOutlined sx={{ mr: 2, color: '#555' }} />
                    Editar banner
                </MenuItem>
                <DialogComponent
                    title="Deletar banner"
                    description="Deseja mesmo deletar esse banner?"
                    onSubmit={() => handleRemove(id)}
                >
                    <MenuItem>
                        <DeleteOutline sx={{ mr: 2, color: '#555' }} />
                        Deletar banner
                    </MenuItem>
                </DialogComponent>
            </Menu>
        </>
    )
}