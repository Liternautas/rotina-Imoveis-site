import { Invoicing } from "@/src/ui/components/DashboardComponents/Invoicing";
import { PropertiesByAdType } from "@/src/ui/components/DashboardComponents/PropertiesByAdType";
import { RealEstateFundraising } from "@/src/ui/components/DashboardComponents/RealEstateFundraising";
import { SalesFunnel } from "@/src/ui/components/DashboardComponents/SalesFunnel";
import { Box, Container } from "@mui/material";
import { Contacts } from "@/src/ui/components/DashboardComponents/Contacts";
import { Properties } from "@/src/ui/components/DashboardComponents/PropertiesByType";

export function Dashboard() {
    return (
        <Container maxWidth="xl">
            <Box sx={{
                display: 'flex',
                gap: 3,
            }}>
                <div style={{
                    display: "flex",
                    flex: 1,
                    flexDirection: "column",
                    gap: 24,
                }}>
                    <RealEstateFundraising />
                    <PropertiesByAdType />
                </div>
                <div style={{
                    display: "flex",
                    flex: 1,
                    flexDirection: "column",
                    gap: 24,
                }}>
                    <SalesFunnel />
                    <Invoicing />
                </div>
                <div style={{
                    display: "flex",
                    flex: 1,
                    flexDirection: "column",
                    gap: 24,
                }}>
                    <Properties />
                    <Contacts />
                </div>
            </Box>
        </Container>
    )
}