import { useFilter } from "@/src/contexts/FilterContext";
import { theme } from "@/styles/theme";
import { Close } from "@mui/icons-material";
import { Autocomplete, Box, Button, IconButton, Modal, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 600,
    width: '100%',
    height: {
        xs: '100vh',
        lg: 'fit-content'
    },
    bgcolor: 'background.paper',
    borderRadius: 1,
    boxShadow: 24,
    p: {
        md: 4,
        xs: '32px 16px'
    },
    display: 'flex',
    flexDirection: 'column',
    gap: 2
};

export function ModalFilter({ open, close }) {
    const router = useRouter();
    const { adType, address, results, type, pickup, findPropertiesAdmin } = useFilter();
    const { city, state, district } = address;

    return (
        <Modal
            open={open}
            onClose={close}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <IconButton onClick={close} sx={{
                    w: 40,
                    h: 40,
                    position: 'absolute',
                    top: 8,
                    right: 8
                }}><Close /></IconButton>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Filtro de imóveis
                </Typography>
                <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2
                }}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={type.options}
                        sx={{ flex: 1, minWidth: 200 }}
                        value={type.value}
                        onChange={(e, value) => type.onChange(value)}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} label="Tipo" />}
                        renderOption={(props, option) => <Box component={'li'} {...props}>{option.name}</Box>}
                    />
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={adType.options}
                        sx={{ flex: 1, minWidth: 200 }}
                        value={adType.value}
                        onChange={(e, value) => adType.onChange(value)}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} label="Finalidade" />}
                        renderOption={(props, option) => <Box component={'li'} {...props}>{option.name}</Box>}
                    />
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={pickup.options}
                        sx={{ flex: 1, minWidth: 200 }}
                        value={pickup.value}
                        onChange={(e, value) => pickup.onChange(value)}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} label="Captador" />}
                        renderOption={(props, option) => <Box component={'li'} {...props}>{option.name}</Box>}
                    />
                </Box>

                <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2
                }}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={state.options}
                        sx={{ flex: 1, minWidth: 200 }}
                        value={state.value}
                        onChange={(e, value) => state.onChange(value)}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} label="Estado" />}
                        renderOption={(props, option) => <Box component={'li'} {...props}>{option.name}</Box>}
                    />
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={city.options}
                        sx={{ flex: 1, minWidth: 200 }}
                        value={city.value}
                        onChange={(e, value) => city.onChange(value)}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} label="Cidade" />}
                        renderOption={(props, option) => <Box component={'li'} {...props}>{option.name}</Box>}
                    />
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={district.options}
                        sx={{ flex: 1, minWidth: 200 }}
                        value={district.value}
                        onChange={(e, value) => district.onChange(value)}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} label="Bairro" />}
                        renderOption={(props, option) => <Box component={'li'} {...props}>{option.name}</Box>}
                    />
                </Box>
                <Button variant="contained" sx={{
                    background: theme.palette.primary.main,
                    height: 48,
                    color: '#fff',
                    fontWeight: 600,
                    ":hover": {
                        background: theme.palette.primary.dark,
                    }
                }} onClick={async () => {
                    await findPropertiesAdmin();
                    close();
                }}>Filtrar</Button>
            </Box>
        </Modal>
    )
}