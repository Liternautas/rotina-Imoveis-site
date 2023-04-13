import { api } from "@/src/services/api";
import { Leads } from "@/src/ui/screens/Admin/Leads";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

export default function LeadsPage({leads, total}) {
    return (
        <Leads leads={leads} total={total} />
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
    const {results, total} = await api.get('leads').then(res => res.data);

    return {
        props: {
            leads: results ?? [],
            total: total ?? 0,
        }
    }
}