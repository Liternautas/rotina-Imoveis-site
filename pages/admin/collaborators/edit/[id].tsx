import { UserProvider } from "@/src/contexts/UserContext";
import { IUser } from "@/src/interfaces";
import { CollaboratorsUpdate } from "@/src/screens/Admin/CollaboratorsUpdate";
import { api } from "@/src/services/api";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

export default function Edit({user}) {
    return (
        <UserProvider>
            <CollaboratorsUpdate user={user}/>
        </UserProvider>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const {id} = ctx.query;
    const { 'imob.token': token, 'imob.user': user } = parseCookies(ctx);
    if (!token || !user) {
        return {
            redirect: {
                destination: `/imobiliarias/login`,
                permanent: false,
            }
        }
    }

    api.defaults.headers['Authorization'] = `Bearer ${token}`

    const res = await api.get(`users/${id}`).then(res => res.data);

    return {
        props: {
            user: res.user ?? null,
        }
    }
}