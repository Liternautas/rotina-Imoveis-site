import { theme } from "@/styles/theme";
import { ListItemIcon } from "@mui/material";
import { SvgIconTypeMap } from "@mui/material";
import { ListItemText } from "@mui/material";
import { ListItemButton } from "@mui/material";
import { ListItem } from "@mui/material";
import { useRouter } from "next/router";

interface AsideButtonProps {
    text: string;
    Icon: any;
    open: boolean;
    onPress?: () => void;
    link?: string;
}

export function AsideButton({ text, Icon, open, onPress, link }: AsideButtonProps) {
    const router = useRouter();
    const path = router.asPath;
    return (
        <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
                selected={path === link}
                sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    color: path === link && theme.palette.primary.main
                }}
                onClick={onPress}
            >
                <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                        color: path === link && theme.palette.primary.main
                    }}
                >
                    <Icon  />
                </ListItemIcon>
                {open && <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />}
            </ListItemButton>
        </ListItem>
    )
}