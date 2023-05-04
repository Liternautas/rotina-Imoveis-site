import { Alert, Box } from "@mui/material";
import { useEffect, useState } from "react";

export function AlertStatusContract({ dataVencimento }) {
    const [status, setStatus] = useState(0);
    const vencimento = new Date(dataVencimento);
    vencimento.setHours(vencimento.getHours() + 4);
    const diferenca = vencimento.getTime() - Date.now();
    const mesesRestantes = diferenca / (1000 * 60 * 60 * 24 * 30);

    useEffect(() => {
        if (mesesRestantes > 6) {
            setStatus(0);
        } else if (mesesRestantes > 0) {
            setStatus(1);
        } else {
            setStatus(2);
        }
    }, [dataVencimento]);

    return (
        <Box sx={{
            mb: 1
        }}>
            {status === 0 && <Alert severity="success">Contrato longe de vencer</Alert>}
            {status === 1 && <Alert severity="warning">Contrato próximo de vencer</Alert>}
            {status === 2 && <Alert severity="error">Contrato vencido</Alert>}
        </Box>
    )
}