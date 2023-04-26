import { UserProvider } from "@/src/contexts/UserContext";
import { IUser } from "@/src/interfaces";
import { Collaborators } from "@/src/ui/screens/Admin/Collaborators";
import { api } from "@/src/services/api";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

export default function CollaboratorsPage({users, total}) {
    return (
        <UserProvider>
            <Collaborators users={users} title="Colaboradores" total={total} />
        </UserProvider>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { 'imob.token': token, 'imob.user': user } = parseCookies(ctx);
    if (!token || !user) {
        return {
            redirect: {
                destination: `/login`,
                permanent: false,
            }
        }
    }

    api.defaults.headers['Authorization'] = `Bearer ${token}`
    const userFormated: IUser = JSON.parse(user);

    const {results, total} = await api.get('users').then(res => res.data);

    return {
        props: {
            users: results ?? [],
            total: total
        }
    }
}