import { IUser } from "@/src/interfaces";
import { Properties } from "@/src/screens/Admin/Properties";
import { api } from "@/src/services/api";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

export default function PropertiesPage({properties}) {
    return (
        <Properties properties={properties} />
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

    const {results} = await api.get('properties').then(res => res.data);

    return {
        props: {
            properties: results ?? [],
        }
    }
}