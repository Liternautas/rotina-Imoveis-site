import { PropertyCreate } from "@/src/ui/screens/Admin/PropertyCreate";
import { api } from "@/src/services/api";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { PropertyProvider } from "@/src/contexts/PropertyContext";

export default function CreatePropertyPage({ details }) {
    return (
        <PropertyProvider>
            <PropertyCreate details={details} />
        </PropertyProvider>
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

    const { results } = await api.get('details').then(res => res.data);

    return {
        props: {
            details: results ?? null,
        }
    }
}