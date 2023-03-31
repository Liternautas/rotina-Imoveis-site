import { IUser } from "@/src/interfaces";
import { Properties } from "@/src/ui/screens/Admin/Properties";
import { api } from "@/src/services/api";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { PropertyProvider } from "@/src/contexts/PropertyContext";

export default function PropertiesPage({ properties }) {
    return (
        <PropertyProvider>
            <Properties properties={properties} />
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

    const { results } = await api.get('properties').then(res => res.data);

    return {
        props: {
            properties: results ?? [],
        }
    }
}