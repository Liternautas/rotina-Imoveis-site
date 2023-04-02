import { ColumnText, Container, Divider, Funnel, FunnelText, Row } from "./styles";

export function SalesFunnel() {
    return (
        <Container>
            <h4>Funil de vendas</h4>
            <Row>
                <ColumnText>
                    <span>Valor total do funil</span>
                    <strong>R$ 0,00</strong>
                </ColumnText>
                <ColumnText>
                    <span>Negócios ativos</span>
                    <strong>0</strong>
                </ColumnText>
            </Row>
            <ul>
                <Funnel>
                    <span></span>
                    <p>Interesse</p>
                    <Divider />
                    <FunnelText>
                        <strong>0%</strong>
                        <span>(0)</span>
                    </FunnelText>
                </Funnel>
                <Funnel>
                    <span></span>
                    <p>Visita</p>
                    <Divider />
                    <FunnelText>
                        <strong>0%</strong>
                        <span>(0)</span>
                    </FunnelText>
                </Funnel>
                <Funnel>
                    <span></span>
                    <p>Proposta</p>
                    <Divider />
                    <FunnelText>
                        <strong>0%</strong>
                        <span>(0)</span>
                    </FunnelText>
                </Funnel>
                <Funnel>
                    <span></span>
                    <p>Assinatura de contrato</p>
                    <Divider />
                    <FunnelText>
                        <strong>0%</strong>
                        <span>(0)</span>
                    </FunnelText>
                </Funnel>
            </ul>
        </Container>
    )
}