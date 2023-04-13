import { CreateSales } from "@/src/ui/screens/Admin/Contracts/create-sales";
import { api } from "@/src/services/api";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { ContractsProvider } from "@/src/contexts/ContractsContext";
import { UpdateSales } from "@/src/ui/screens/Admin/Contracts/update-sales";

export default function UpdateSalesPage({ customers, realtors, contract }) {
    return (
        <ContractsProvider>
            <UpdateSales customers={customers} realtors={realtors} contract={contract} />
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

    const customers = await api.get('users/customers').then(res => res.data);
    const realtors = await api.get('users/realtors').then(res => res.data);
    const {result} = await api.get(`sales-contracts/${ctx.query.id}`).then(res => res.data);
    
    return {
        props: {
            customers: customers.results ?? [],
            realtors: realtors.results ?? [],
            contract: result ?? null
        }
    }
}