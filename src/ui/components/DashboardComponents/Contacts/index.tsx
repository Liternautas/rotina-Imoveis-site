import { theme } from "@/styles/theme";
import { ColumnText, Container, Row } from "./styles";
import { ILead } from "@/src/interfaces";
import { CardPropertyTable } from "../../Cards/CardPropertyTable";

interface Props {
    leads: ILead[];
}

export function Contacts({ leads }: Props) {
    return (
        <Container>
            <h4>Contatos</h4>
            <ul>
                {leads.map(lead => (
                    <Row sx={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <Row style={{ border: 0, padding: 0, margin: 0 }}>
                            {lead.property && <CardPropertyTable property={lead.property}/>}
                        </Row>
                        <ColumnText>
                            <strong>{lead.name}</strong>
                            <strong style={{
                                color: theme.palette.primary.main
                            }}>{lead.phone}</strong>
                        </ColumnText>
                    </Row>
                ))}
            </ul>
        </Container>
    )
}