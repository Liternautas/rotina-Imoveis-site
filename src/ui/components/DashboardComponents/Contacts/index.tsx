import { theme } from "@/styles/theme";
import { ColumnText, Container, Row } from "./styles";

export function Contacts() {
    return (
        <Container>
            <h4>Contatos</h4>
            <ul>
                <Row>
                    <Row style={{border: 0, padding: 0, margin: 0}}>
                        <ColumnText style={{
                            alignItems: "flex-start"
                        }}>
                            <strong>Casa</strong>
                            <span>Loteamento Ipanema</span>
                        </ColumnText>
                    </Row>
                    <ColumnText>
                        <strong>Maria de Lurdes</strong>
                        <strong style={{
                            color: theme.palette.primary.main
                        }}>(64) 99944-9992</strong>
                    </ColumnText>
                </Row>
                <Row>
                    <Row style={{border: 0, padding: 0, margin: 0}}>
                        <ColumnText style={{
                            alignItems: "flex-start"
                        }}>
                            <strong>Casa</strong>
                            <span>Loteamento Ipanema</span>
                        </ColumnText>
                    </Row>
                    <ColumnText>
                        <strong>Maria de Lurdes</strong>
                        <strong style={{
                            color: theme.palette.primary.main
                        }}>(64) 99944-9992</strong>
                    </ColumnText>
                </Row>
                <Row>
                    <Row style={{border: 0, padding: 0, margin: 0}}>
                        <ColumnText style={{
                            alignItems: "flex-start"
                        }}>
                            <strong>Casa</strong>
                            <span>Loteamento Ipanema</span>
                        </ColumnText>
                    </Row>
                    <ColumnText>
                        <strong>Maria de Lurdes</strong>
                        <strong style={{
                            color: theme.palette.primary.main
                        }}>(64) 99944-9992</strong>
                    </ColumnText>
                </Row>
                <Row>
                    <Row style={{border: 0, padding: 0, margin: 0}}>
                        <ColumnText style={{
                            alignItems: "flex-start"
                        }}>
                            <strong>Casa</strong>
                            <span>Loteamento Ipanema</span>
                        </ColumnText>
                    </Row>
                    <ColumnText>
                        <strong>Maria de Lurdes</strong>
                        <strong style={{
                            color: theme.palette.primary.main
                        }}>(64) 99944-9992</strong>
                    </ColumnText>
                </Row>
            </ul>
        </Container>
    )
}