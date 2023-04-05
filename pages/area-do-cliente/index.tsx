import dynamic from "next/dynamic";
import { checkCustomer } from "@/src/helpers/auth-checks";
import { IUser } from "@/src/interfaces";
import { api } from "@/src/services/api";
import { CustomerArea } from "@/src/ui/screens/CustomerArea";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import UserProvider from "@/src/contexts/UserContext";

export default function CustomerAreaPage({user}) {
    return (
        <UserProvider>
            <CustomerArea user={user}/>
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

    const {user} = await api.get(`users/${userNormalize.id}`).then(res => res.data);

    return {
        props: {
            user: user
        }
    }
}