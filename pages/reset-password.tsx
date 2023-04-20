import { HeadComponent } from "@/src/ui/components/HeadComponent";
import { ResetPassword } from "@/src/ui/screens/Auth/ResetPassword";

export default function ResetPasswordPage() {
    return (
        <>
            <HeadComponent title='Recuperação de senha - Rotina Imóveis' />
            <ResetPassword />
        </>
    )
}