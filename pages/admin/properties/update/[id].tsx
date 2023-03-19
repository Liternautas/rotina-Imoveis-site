import { PropertyCreate } from "@/src/screens/Admin/PropertyCreate";
import { api } from "@/src/services/api";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

export default function CreatePropertyPage({details}) {
    return (
        <PropertyCreate details={details} />
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

    const {results} = await api.get('details').then(res => res.data);

    return {
        props: {
            details: results ?? null,
        }
    }
}