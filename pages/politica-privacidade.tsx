import { HeadComponent } from "@/src/ui/components/HeadComponent";
import { PrivacyPolicy } from "@/src/ui/screens/Site/PrivacyPolicy";

export default function PrivacyPolicyPage() {
    return (
        <>
            <HeadComponent
                title='Política de privacidade - Rotina Imóveis'
                description='A Rotina Imóveis valoriza a privacidade de seus usuários e se compromete em proteger as informações pessoais coletadas em seus serviços. Esta Política de Privacidade descreve como coletamos, usamos e compartilhamos suas informações pessoais quando você usa os serviços da Rotina Imóveis.'
            >
                <meta name='robots' content='index, follow' />
            </HeadComponent>
            <PrivacyPolicy />
        </>
    )
}