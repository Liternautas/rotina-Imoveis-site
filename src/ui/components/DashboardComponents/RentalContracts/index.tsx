import { theme } from "@/styles/theme";
import { Column, ColumnText, Container, Row } from "./styles";
import { ILead, IRentalContract } from "@/src/interfaces";
import { CardPropertyTable } from "../../Cards/CardPropertyTable";
import { AlertStatusContract } from "../../AlertStatusContract";

interface Props {
    rentalContracts?: IRentalContract[];
}

export function RentalContracts({ rentalContracts }: Props) {
    return (
        <Container>
            <h4>Contratos de aluguel</h4>
            <ul>
                {rentalContracts?.map(contract => (

                    <Column style={{ border: 0, padding: 0, margin: 0 }}>
                        <AlertStatusContract dataVencimento={contract.end} />
                        <Row sx={{
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            {contract.property && <CardPropertyTable property={contract.property} />}
                            <ColumnText>
                                <strong>{contract.tenant.name}</strong>
                                <strong style={{
                                    color: theme.palette.primary.main
                                }}>{contract.tenant.phone}</strong>
                            </ColumnText>
                        </Row>
                    </Column>
                ))}
            </ul>
        </Container>
    )
}