import { ListItemIcon } from "@mui/material";
import { SvgIconTypeMap } from "@mui/material";
import { ListItemText } from "@mui/material";
import { ListItemButton } from "@mui/material";
import { ListItem } from "@mui/material";

interface AsideButtonProps {
    text: string;
    Icon: any;
    open: boolean;
    onPress?: () => void;
}

export function AsideButton({ text, Icon, open, onPress }: AsideButtonProps) {
    return (
        <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
                sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                }}
                onClick={onPress}
            >
                <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                    }}
                >
                    <Icon  />
                </ListItemIcon>
                {open && <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />}
            </ListItemButton>
        </ListItem>
    )
}