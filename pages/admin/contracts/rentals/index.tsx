import { Rentals } from "@/src/ui/screens/Admin/Contracts/rentals";
import { api } from "@/src/services/api";
import { GetServerSideProps } from "next";
import { Alert } from "@mui/material";
import { parseCookies } from "nookies";
import { ContractsProvider } from "@/src/contexts/ContractsContext";

export default function ContractsPage({ contracts, error }) {
    if (error) {
        return (
            <Alert severity="error">{error}</Alert>
        )
    }

    return (
        <ContractsProvider>
            <Rentals contracts={contracts} />
        </ContractsProvider>
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

        const { results } = await api.get('rental-contracts').then(res => res.data);

        return {
            props: {
                contracts: results ?? [],
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