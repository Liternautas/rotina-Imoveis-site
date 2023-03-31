import { PropertyCreate } from "@/src/ui/screens/Admin/PropertyCreate";
import { api } from "@/src/services/api";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { PropertyProvider } from "@/src/contexts/PropertyContext";

export default function CreatePropertyPage({details, owners, realtors}) {
    return (
        <PropertyProvider>
            <PropertyCreate details={details} realtors={realtors} owners={owners}/>
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

    const details = await api.get('details').then(res => res.data);
    const owners = await api.get('users/owners').then(res => res.data);
    const realtors = await api.get('users/realtors').then(res => res.data);

    return {
        props: {
            details: details.results ?? null,
            owners: owners.results ?? [],
            realtors: realtors.results ?? [],
        }
    }
}