import { IUser } from "@/src/interfaces";
import { Sales } from "@/src/ui/screens/Admin/Contracts/sales";
import { api } from "@/src/services/api";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

export default function ContractsPage({contracts}) {
    return (
        <Sales contracts={contracts}/>
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

    const { results } = await api.get('sales-contracts').then(res => res.data);

    return {
        props: {
            contracts: results ?? [],
        }
    }
}