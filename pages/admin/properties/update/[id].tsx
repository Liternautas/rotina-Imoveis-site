import { PropertyCreate } from "@/src/ui/screens/Admin/PropertyCreate";
import { api } from "@/src/services/api";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { PropertyProvider } from "@/src/contexts/PropertyContext";
import UserProvider from "@/src/contexts/UserContext";

export default function CreatePropertyPage({ details, owners, realtors }) {
    return (
        <PropertyProvider>
            <UserProvider>
                <PropertyCreate details={details} realtors={realtors} owners={owners} />
            </UserProvider>
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
    const collaborators = await api.get('users/collaborators').then(res => res.data);
    const realtors = await api.get('users/realtors').then(res => res.data);
    let array = [];
    {realtors.results && array.push(...realtors.results)}
    {collaborators.results && array.push(...collaborators.results)}

    return {
        props: {
            details: details.results ?? null,
            owners: owners.results ?? [],
            realtors: array ?? [],
        }
    }
}