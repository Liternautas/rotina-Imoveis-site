import { IUser } from "@/src/interfaces";
import { Properties } from "@/src/ui/screens/Admin/Properties";
import { api } from "@/src/services/api";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { PropertyProvider } from "@/src/contexts/PropertyContext";
import FilterProvider from "@/src/contexts/FilterContext";

export default function PropertiesPage({ properties, total, realtors }) {
    return (
        <PropertyProvider>
            <FilterProvider>
                <Properties properties={properties} total={total} realtors={realtors}/>
            </FilterProvider>
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

    const { results, count } = await api.get('properties').then(res => res.data);
    const realtors = await api.get('users/realtors').then(res => res.data);
    const collaborators = await api.get('users/collaborators').then(res => res.data);
    let array = [];
    {realtors?.results ?? array.push(...realtors.results)}
    {collaborators?.results ?? array.push(...collaborators.results)}

    return {
        props: {
            properties: results ?? [],
            total: count ?? 0,
            realtors: array ?? []
        }
    }
}