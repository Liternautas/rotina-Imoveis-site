import { useInvoices } from "@/src/contexts/InvoicesContext";
import { downloadFile } from "@/src/helpers/file";
import { maskPrice } from "@/src/helpers/mask";
import { useForm } from "@/src/hooks/useForm";
import { useSelect } from "@/src/hooks/useSelect";
import { IInvoice, IRentalContract } from "@/src/interfaces";
import { CardPropertyH } from "@/src/ui/components/Cards/CardPropertyH";
import { CardPropertyTable } from "@/src/ui/components/Cards/CardPropertyTable";
import { CardRentalContract } from "@/src/ui/components/Cards/CardRentalContract";
import { DocumentScannerOutlined, UploadFileOutlined, Remove, Delete, Download } from "@mui/icons-material";
import { Card, CardContent, Box, Button, Container, InputAdornment, Modal, TextField, Typography, IconButton } from "@mui/material";
import { useEffect, useState, useRef } from "react";

interface Props {
    contracts: IRentalContract[];
    invoice: IInvoice;
}

export function InvoiceUpdate({ contracts, invoice }: Props) {
    const { update, file, setFile, } = useInvoices();

    const [open, setOpen] = useState(false);
    const [contract, setContract] = useState<IRentalContract>(null);
    const reference = useForm('date');
    const expiration = useForm('date');
    const price = useForm('price');
    const fileInputRef = useRef(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleChange = (item: IRentalContract) => {
        setContract(item);
        handleClose();
    }
    const handleUpload = async ({ target }) => {
        setFile(target.files[0]);
    }
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };
    const handleSubmit = async () => {
        await update({
            id: invoice.id,
            expiration: new Date(expiration.value),
            reference: new Date(reference.value),
            price: price.value,
        });
    }
    useEffect(() => {
        if (contract && !invoice) {
            price.setValue(maskPrice(contract.price));
        }
    }, [contract]);

    useEffect(() => {
        if (invoice) {
            console.log(invoice);
            setContract(invoice.rentalContract);
            price.setValue(maskPrice(invoice.price));
            expiration.setValue(invoice.expiration);
            reference.setValue(invoice.reference);
        }
    }, [invoice]);

    return (
        <Container maxWidth="xl">
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 2
            }}>
                <Typography variant="h6" fontWeight={600}>Atualizar fatura</Typography>
            </Box>
            <Box>
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
                        {invoice.path &&
                            <Button variant="outlined" sx={{
                                display: 'flex',
                                gap: 1,
                                height: 48,
                                mt: 3
                            }} onClick={() => downloadFile(invoice.path)}>
                                <Download />
                                Baixar fatura
                            </Button>
                        }
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
                        {invoice.voucher &&
                            <Button variant="outlined" sx={{
                                display: 'flex',
                                gap: 1,
                                height: 48,
                                mt: 3
                            }} onClick={() => downloadFile(invoice.voucher)}>
                                <Download />
                                Baixar comprovante
                            </Button>
                        }
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 1,
                                mt: 3,
                                fontWeight: 600
                            }}
                        >
                            <Button
                                variant="outlined"
                                onClick={() => { }}
                                sx={{
                                    display: 'flex',
                                    gap: 1,
                                    height: 48,
                                    mt: 3,
                                    fontWeight: 600
                                }}>
                                Quitar Fatura
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleSubmit}
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
                    </Box>
                }
            </Box>
        </Container>
    )
}