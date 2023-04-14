import { GetServerSideProps } from "next";
import { Invoices } from "@/src/ui/screens/Admin/Invoices";
import { parseCookies } from "nookies";
import { api } from "@/src/services/api";
import InvoicesProvider from "@/src/contexts/InvoicesContext";
import { Alert } from "@mui/material";

export default function InvoicesPage({ invoices, error }) {
    if (error) {
        return (
            <Alert severity="error">{error}</Alert>
        )
    }

    return (
        <InvoicesProvider>
            <Invoices invoices={invoices} />
        </InvoicesProvider>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {
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
        const { results } = await api.get('invoices').then(res => res.data);

        return {
            props: {
                invoices: results ?? [],
            }
        }
    } catch (error) {
        return {
            props: {
                error: 'Acesso negado.',
            }
        }
    }
}