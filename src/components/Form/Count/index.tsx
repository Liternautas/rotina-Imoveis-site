import { Add, AddCircle, Minimize, RemoveCircle } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";

interface Props {
    title: string;
    subtitle?: string;
    value: number;
    setValue: any;
}

export function Count({ title, subtitle, setValue, value }: Props) {
    const add = () => {
        setValue(value + 1)
    }
    const remove = () => {
        if(value > 0) setValue(value - 1);
    }
    
    return (
        <Box>
            <Typography variant="h6">{title}</Typography>
            {subtitle && <Typography>{subtitle}</Typography>}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
            }}>
                <IconButton sx={{ color: "primary.main" }} onClick={remove}>
                    <RemoveCircle />
                </IconButton>
                <Typography>{value}</Typography>
                <IconButton sx={{ color: "primary.main" }} onClick={add}>
                    <AddCircle />
                </IconButton>
            </Box>
        </Box>
    )
}