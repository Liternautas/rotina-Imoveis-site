import { IconButton, Menu, MenuItem } from "@mui/material";
import { DialogComponent } from "../../DialogComponent";
import { CancelOutlined, DeleteOutline, EditOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useState } from "react";
import { useBanners } from "@/src/contexts/BannersContext";

export function MenuLead({ children, id }) {
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
                    title="Desativar lead"
                    description="Deseja mesmo desativar esse lead?"
                >
                    <MenuItem>
                        <CancelOutlined sx={{ mr: 2, color: '#555' }} />
                        Desativar lead
                    </MenuItem>
                </DialogComponent>
                <MenuItem onClick={() => router.push(`/admin/leads/edit/${id}`)}>
                    <EditOutlined sx={{ mr: 2, color: '#555' }} />
                    Detalhes lead
                </MenuItem>
                <DialogComponent
                    title="Deletar lead"
                    description="Deseja mesmo deletar esse lead?"
                    onSubmit={() => handleRemove(id)}
                >
                    <MenuItem>
                        <DeleteOutline sx={{ mr: 2, color: '#555' }} />
                        Deletar lead
                    </MenuItem>
                </DialogComponent>
            </Menu>
        </>
    )
}