import { TableLeadsAdmin } from "@/src/ui/components/Tables/table-leads-admin";
import {Container, Box, Typography} from "@mui/material";

export function Leads({leads, total}) {
    return (
        <Container maxWidth="xl">
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 2
            }}>
                <Typography variant="h6" fontWeight={600}>Leads</Typography>
            </Box>
            <Box>
                <TableLeadsAdmin leads={leads} action={true} />
            </Box>
        </Container>
    )
}