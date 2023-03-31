import { useState } from "react";
import { ListItemIcon, Collapse } from "@mui/material";
import { SvgIconTypeMap } from "@mui/material";
import { ListItemText } from "@mui/material";
import { ListItemButton } from "@mui/material";
import { List } from "@mui/material";
import { Inbox as InboxIcon, ExpandLess, ExpandMore, Language as LanguageIcon } from "@mui/icons-material";
import { AsideButton } from "../AsideButton";

interface AsideButtonProps {
    text: string;
    Icon: any;
    open: boolean;
    children?: any;
    onEnvet?: () => void;
}

export function AsideButtonCollapse({ text, Icon, open, children, onEnvet }: AsideButtonProps) {
    const [show, setShow] = useState(false);

    const handleClick = () => setShow(!show);

    return (
        <>
            <ListItemButton onClick={() => {
                onEnvet();
                handleClick();
            }} sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
            }}>
                <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                    }}
                >
                    <Icon />
                </ListItemIcon>
                {open &&
                    <>
                        <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                        {show ? <ExpandLess /> : <ExpandMore />}
                    </>
                }
            </ListItemButton>
            <Collapse in={show} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ paddingLeft: 2 }}>
                    {children}
                </List>
            </Collapse>
        </>
    )
}