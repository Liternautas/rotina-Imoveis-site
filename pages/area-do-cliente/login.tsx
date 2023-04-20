import { HeadComponent } from "@/src/ui/components/HeadComponent";
import { Login } from "@/src/ui/screens/Login";
import { GetServerSideProps } from "next";

export default function LoginPage() {
    return (
        <>
            <HeadComponent title='Login area do cliente - Rotina Imóveis' />
            <Login />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    return {
        props: {}
    }
}