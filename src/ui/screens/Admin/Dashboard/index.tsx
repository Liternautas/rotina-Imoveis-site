import { Invoicing } from "@/src/ui/components/DashboardComponents/Invoicing";
import { PropertiesByAdType } from "@/src/ui/components/DashboardComponents/PropertiesByAdType";
import { RealEstateFundraising } from "@/src/ui/components/DashboardComponents/RealEstateFundraising";
import { SalesFunnel } from "@/src/ui/components/DashboardComponents/SalesFunnel";
import { Box, Container } from "@mui/material";
import { Contacts } from "@/src/ui/components/DashboardComponents/Contacts";
import { Properties } from "@/src/ui/components/DashboardComponents/PropertiesByType";
import { RentalContracts } from "@/src/ui/components/DashboardComponents/RentalContracts";

export function Dashboard({ propertiesByMonth, properties, types, leads, salesContracts, rentalContracts, rentalContractsData }) {
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
                    height: "fit-content",
                    flexDirection: "column",
                    gap: 24,
                    maxWidth: 442
                }}>
                    <RealEstateFundraising propertiesByMonth={propertiesByMonth} />
                    <Contacts leads={leads} />
                </div>
                <div style={{
                    display: "flex",
                    flex: 1,
                    height: "fit-content",
                    flexDirection: "column",
                    gap: 24,
                    maxWidth: 442
                }}>
                    <SalesFunnel />
                    <Invoicing salesContracts={salesContracts} rentalContracts={rentalContracts} />
                </div>
                <div style={{
                    display: "flex",
                    flex: 1,
                    height: "fit-content",
                    flexDirection: "column",
                    gap: 24,
                    maxWidth: 442
                }}>
                    <RentalContracts rentalContracts={rentalContractsData}/>
                    <Properties properties={properties} types={types}/>
                    {/* <PropertiesByAdType properties={properties} /> */}
                </div>
            </Box>
        </Container>
    )
}