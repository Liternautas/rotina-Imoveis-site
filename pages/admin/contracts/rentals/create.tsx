import { CreateRentals } from "@/src/ui/screens/Admin/Contracts/create-rentals";
import { api } from "@/src/services/api";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { ContractsProvider } from "@/src/contexts/ContractsContext";

export default function CreateContractsPage({ customers, realtors }) {
    return (
        <ContractsProvider>
            <CreateRentals customers={customers} realtors={realtors} />
        </ContractsProvider>
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

    const customers = await api.get('users/customers?limit=300').then(res => res.data);
    const realtors = await api.get('users/realtors').then(res => res.data);

    return {
        props: {
            customers: customers.results ?? [],
            realtors: realtors.results ?? []
        }
    }
}