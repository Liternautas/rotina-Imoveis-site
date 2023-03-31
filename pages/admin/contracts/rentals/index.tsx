import { Rentals } from "@/src/ui/screens/Admin/Contracts/rentals";
import { api } from "@/src/services/api";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

export default function ContractsPage({contracts}) {
    return (
        <Rentals contracts={contracts}/>
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

    api.defaults.headers['Authorization'] = `Bearer ${token}`;

    const { results } = await api.get('rental-contracts').then(res => res.data);

    return {
        props: {
            contracts: results ?? [],
        }
    }
}