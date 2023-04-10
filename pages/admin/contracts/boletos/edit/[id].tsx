import InvoicesProvider from "@/src/contexts/InvoicesContext";
import { api } from "@/src/services/api";
import { InvoiceCreate } from "@/src/ui/screens/Admin/Invoices/create";
import { InvoiceUpdate } from "@/src/ui/screens/Admin/Invoices/update";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

export default function InvoiceUpdatePage({contracts, invoice}) {
    return (
        <InvoicesProvider>
            <InvoiceUpdate contracts={contracts} invoice={invoice}/>
        </InvoicesProvider>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const {id} = ctx.query;
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
    const { invoice } = await api.get(`invoices/${id}`).then(res => res.data);
    
    return {
        props: {
            contracts: results ?? [],
            invoice: invoice ?? null
        }
    }
}