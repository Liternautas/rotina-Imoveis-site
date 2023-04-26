import { Invoicing } from "@/src/ui/components/DashboardComponents/Invoicing";
import { PropertiesByAdType } from "@/src/ui/components/DashboardComponents/PropertiesByAdType";
import { RealEstateFundraising } from "@/src/ui/components/DashboardComponents/RealEstateFundraising";
import { SalesFunnel } from "@/src/ui/components/DashboardComponents/SalesFunnel";
import { Box, Container } from "@mui/material";
import { Contacts } from "@/src/ui/components/DashboardComponents/Contacts";
import { Properties } from "@/src/ui/components/DashboardComponents/PropertiesByType";

export function Dashboard({ propertiesByMonth, properties, types, leads, salesContracts, rentalContracts }) {
    return (
        <Container maxWidth="xl">
            <Box sx={{
                maxWidth: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                gap: 3,
            }}>
                <div style={{
                    display: "flex",
                    flex: 1,
                    flexDirection: "column",
                    gap: 24,
                }}>
                    <RealEstateFundraising propertiesByMonth={propertiesByMonth} />
                    <PropertiesByAdType properties={properties} />
                </div>
                <div style={{
                    display: "flex",
                    flex: 1,
                    flexDirection: "column",
                    gap: 24,
                }}>
                    <SalesFunnel />
                    <Invoicing salesContracts={salesContracts} rentalContracts={rentalContracts} />
                </div>
                <div style={{
                    display: "flex",
                    flex: 1,
                    flexDirection: "column",
                    gap: 24,
                }}>
                    <Properties properties={properties} types={types}/>
                    <Contacts leads={leads} />
                </div>
            </Box>
        </Container>
    )
}