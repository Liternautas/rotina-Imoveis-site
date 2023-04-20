import { HeadComponent } from "@/src/ui/components/HeadComponent";
import { ForgotPassword } from "@/src/ui/screens/Auth/ForgotPassword";

export default function ForgotPasswordPage() {
    return (
        <>
            <HeadComponent title='Recuperação de conta - Rotina Imóveis' />
            <ForgotPassword />
        </>
    )
}