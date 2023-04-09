import { maskPrice } from "@/src/helpers/mask";
import { useForm } from "@/src/hooks/useForm";
import { useSelect } from "@/src/hooks/useSelect";
import { IRentalContract } from "@/src/interfaces";
import { CardPropertyH } from "@/src/ui/components/Cards/CardPropertyH";
import { CardPropertyTable } from "@/src/ui/components/Cards/CardPropertyTable";
import { CardRentalContract } from "@/src/ui/components/Cards/CardRentalContract";
import { DocumentScannerOutlined, UploadFileOutlined, Remove, Delete } from "@mui/icons-material";
import { Card, CardContent, Box, Button, Container, InputAdornment, Modal, TextField, Typography, IconButton } from "@mui/material";
import { useEffect, useState, useRef } from "react";

interface Props {
    contracts: IRentalContract[];
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 1,
    boxShadow: 24,
    p: 1.5,
};

export function InvoiceCreate({ contracts }: Props) {
    const [open, setOpen] = useState(false);
    const [contract, setContract] = useState<IRentalContract>(null);
    const reference = useForm('date');
    const expiration = useForm('date');
    const price = useForm('price');
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleChange = (item: IRentalContract) => {
        setContract(item);
        handleClose();
    }
    const handleUpload = async ({ target }) => {
        console.log(target.files[0])
        setFile(target.files[0]);
    }
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    useEffect(() => {
        if (contract) {
            price.setValue(maskPrice(contract.price));
        }
    }, [contract]);

    return (
        <Container maxWidth="xl">
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 2
            }}>
                <Typography variant="h6" fontWeight={600}>Cadastrar fatura</Typography>
            </Box>
            <Box>
                <Button
                    variant="outlined"
                    onClick={handleOpen}
                    sx={{
                        display: 'flex',
                        gap: 1,
                        height: 48
                    }}>
                    <DocumentScannerOutlined />
                    Vincular Contrato
                </Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
                            Selecione um contrato
                        </Typography>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1
                        }}>
                            {contracts.map(item => (
                                <CardRentalContract contract={item} onChange={() => handleChange(item)} />
                            ))}
                        </Box>
                    </Box>
                </Modal>
                {contract &&
                    <Box sx={{
                        mt: 3
                    }}>
                        <Box sx={{ width: "fit-content" }}>
                            {contract.property && <CardPropertyH property={contract.property} isLink={false} />}
                            <Box sx={{ display: "flex", gap: 2, mt: 3, maxWidth: 632 }}>
                                <TextField
                                    id="outlined-basic"
                                    label="Responsável"
                                    variant="outlined"
                                    fullWidth
                                    value={contract.locator.name}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <TextField
                                    id="outlined-basic"
                                    label="Inquilino"
                                    variant="outlined"
                                    fullWidth
                                    value={contract.tenant.name}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Box>
                            <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                                <TextField
                                    label="Valor"
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                                    }}
                                    value={price.value}
                                    onChange={(e) => price.onChange(e)}
                                    sx={{ width: 200 }}
                                />
                                <TextField
                                    label="Referência"
                                    variant="outlined"
                                    value={reference?.value}
                                    onChange={(e) => reference.onChange(e)}
                                    type={"date"}
                                    sx={{ width: 200 }}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                />
                                <TextField
                                    label="Vencimento"
                                    variant="outlined"
                                    value={expiration?.value}
                                    onChange={(e) => expiration.onChange(e)}
                                    type={"date"}
                                    sx={{ width: 200 }}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                />
                            </Box>
                        </Box>
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
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleUpload}
                        />
                        {!file && <Button
                            variant="outlined"
                            onClick={handleButtonClick}
                            sx={{
                                display: 'flex',
                                gap: 1,
                                height: 48,
                                mt: 3
                            }}>
                            <UploadFileOutlined />
                            Vincular Fatura
                        </Button>}
                        <Button
                            variant="contained"
                            onClick={() => { }}
                            sx={{
                                display: 'flex',
                                gap: 1,
                                height: 48,
                                mt: 3,
                                color: '#fff',
                                fontWeight: 600
                            }}>
                            Salvar Fatura
                        </Button>
                    </Box>
                }
            </Box>
        </Container>
    )
}