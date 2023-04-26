import { useForm } from "@/src/hooks/useForm";
import { UploadFileOutlined, Delete } from "@mui/icons-material";
import { Box, Button, Card, CardContent, Modal, IconButton, TextField, Typography } from "@mui/material";
import { useEffect, useState, useRef } from "react";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: 500,
    borderRadius: 1,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
    pt: 3
};


export function ModalPayInvoice({ children, onSubmit }) {
    const payment = useForm('date');
    const fileInputRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState<File>(null);

    const handleClose = () => setOpen(false);

    const handleSubmit = async () => {
        if (payment.validate()) {
            await onSubmit(payment.value, file);
            handleClose();
        }
    }

    const handleUpload = async ({ target }) => {
        console.log(target.files[0])
        setFile(target.files[0]);
    }

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    useEffect(() => {
    }, []);

    return (
        <>
            <Box onClick={async () => {
                setOpen(true);
            }}>
                {children}
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Quitar fatura
                    </Typography>
                    <Box sx={{
                        my: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                    }}>
                        <TextField
                            label="Data do recebimento"
                            variant="outlined"
                            value={payment?.value}
                            onChange={(e) => payment.onChange(e)}
                            type={"date"}
                            sx={{ width: 200 }}
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleUpload}
                        />
                        {file &&
                            <Card sx={{
                                width: 'fit-content',
                                mt: 3
                            }}>
                                <CardContent sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    p: 2,
                                    pb: '16px !important',
                                }}>
                                    <Typography sx={{
                                        fontWeight: 600
                                    }}>
                                        {file.name}
                                    </Typography>
                                    <IconButton onClick={() => setFile(null)}>
                                        <Delete />
                                    </IconButton>
                                </CardContent>
                            </Card>
                        }
                        <Button
                            variant="outlined"
                            onClick={handleButtonClick}
                            sx={{
                                display: 'flex',
                                gap: 1,
                                height: 48,
                            }}>
                            <UploadFileOutlined />
                            Vincular comprovante
                        </Button>
                    </Box>
                    <Box sx={{
                        height: 48,
                        display: 'flex',
                        gap: 2
                    }}>
                        <Button
                            onClick={handleClose}
                            variant="outlined"
                            fullWidth
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                            sx={{
                                color: "#fff",
                                fontWeight: 600
                            }}
                            fullWidth
                        >
                            Quitar fatura
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}