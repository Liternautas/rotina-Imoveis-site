import dynamic from "next/dynamic";
import { checkCustomer } from "@/src/helpers/auth-checks";
import { IUser } from "@/src/interfaces";
import { api } from "@/src/services/api";
import { CustomerArea } from "@/src/ui/screens/CustomerArea";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import UserProvider from "@/src/contexts/UserContext";
import { HeadComponent } from "@/src/ui/components/HeadComponent";

export default function CustomerAreaPage({user, invoices}) {
    return (
        <UserProvider>
            <HeadComponent title='Area do cliente - Rotina Imóveis' />
            <CustomerArea user={user} invoices={invoices}/>
        </UserProvider>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { 'imob.token': token, 'imob.user': userData } = parseCookies(ctx);

    
    if (!checkCustomer(token, userData)) {
        return {
            redirect: {
                destination: `/area-do-cliente/login`,
                permanent: false,
            }
        }
    }
    
    const userNormalize:IUser = JSON.parse(userData);
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
    const {user} = await api.get(`users/${userNormalize.id}`).then(res => res.data);
    const {results} = await api.get(`invoices/me`).then(res => res.data);

    return {
        props: {
            user: user,
            invoices: results ?? []
        }
    }
}