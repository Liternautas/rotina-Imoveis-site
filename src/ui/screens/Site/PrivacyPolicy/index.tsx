import { Box, Container, TextField, Typography, Button, IconButton } from "@mui/material";
import { Links, Title } from "./styles";
import {useRouter} from "next/router";

export function PrivacyPolicy() {
    const router = useRouter();

    return (
        <Container sx={{
            mt: '64px',
            py: {
                sx: 0,
                md: 6
            },
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            gap: 8
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2
            }}>
                <Box>
                    <Title>Política de privacidade</Title>
                    <Typography>A Rotina Imóveis valoriza a privacidade de seus usuários e se compromete em proteger as informações pessoais coletadas em seus serviços. Esta Política de Privacidade descreve como coletamos, usamos e compartilhamos suas informações pessoais quando você usa os serviços da Rotina Imóveis.</Typography>
                </Box>
                <Box>
                    <Title>Coleta de Informações Pessoais</Title>
                    <Typography>Ao utilizar os serviços da Rotina Imóveis, coletamos informações pessoais, tais como nome, endereço de e-mail, endereço físico, número de telefone e outras informações que você nos fornece. Também podemos coletar informações sobre sua navegação em nossos serviços, incluindo o histórico de busca, visualização de imóveis, interesses e outras atividades relacionadas aos nossos serviços.</Typography>
                </Box>
                <Box>
                    <Title>Uso das Informações Pessoais</Title>
                    <Typography>As informações pessoais coletadas são utilizadas para fornecer e melhorar nossos serviços, personalizar sua experiência, enviar notificações importantes sobre nossos serviços e atender às suas solicitações. Também podemos utilizar suas informações para fins de análise de dados, prevenção de fraudes e segurança, bem como para fins de marketing, desde que você tenha dado seu consentimento para tal.</Typography>
                </Box>
                <Box>
                    <Title>Compartilhamento de Informações Pessoais</Title>
                    <Typography>A Rotina Imóveis não compartilha informações pessoais com terceiros, exceto nas seguintes circunstâncias:</Typography>
                    <ul style={{paddingLeft: 32}}>
                        <li>Quando exigido por lei ou processo legal;</li>
                        <li>Quando necessário para proteger a segurança dos nossos serviços, funcionários ou usuários;</li>
                        <li>Quando necessário para proteger nossos direitos de propriedade intelectual;</li>
                        <li>Quando necessário para fornecer nossos serviços, incluindo processamento de pagamentos, marketing ou atendimento ao cliente, para provedores de serviços terceirizados que concordam em manter a confidencialidade das informações.</li>
                    </ul>
                </Box>
                <Box>
                    <Title>Segurança das Informações Pessoais</Title>
                    <Typography>A Rotina Imóveis toma medidas de segurança razoáveis para proteger as informações pessoais coletadas de perda, uso indevido, acesso não autorizado, divulgação, alteração ou destruição. No entanto, não podemos garantir a segurança de suas informações pessoais.</Typography>
                </Box>
                <Box>
                    <Title>Alterações na Política de Privacidade</Title>
                    <Typography>A Rotina Imóveis pode modificar esta Política de Privacidade de tempos em tempos. Se fizermos alterações significativas na forma como coletamos, usamos ou compartilhamos suas informações pessoais, notificaremos você por meio de nossos serviços ou enviando um e-mail para o endereço que você nos forneceu. Recomendamos que você reveja periodicamente esta Política de Privacidade.</Typography>
                </Box>
                <Box>
                    <Title>Contato</Title>
                    <Typography>Se você tiver dúvidas ou preocupações sobre esta Política de Privacidade, entre em contato conosco pelo e-mail: <strong>privacidade@rotinaimoveis.com.br</strong>.</Typography>
                    <Button variant="outlined" sx={{mt: 2}} onClick={() => router.push('/contato')}>Contato</Button>
                </Box>
            </Box>
        </Container>
    )
}