import { Login } from "@/src/ui/screens/Login";
import { GetServerSideProps } from "next";

export default function LoginPage() {
    return (
        <Login />
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    return {
        props: {}
    }
}