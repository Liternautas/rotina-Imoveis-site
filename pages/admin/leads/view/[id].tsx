import { api } from "@/src/services/api";
import { Leads } from "@/src/ui/screens/Admin/Leads";
import { LeadView } from "@/src/ui/screens/Admin/Leads/view";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

export default function LeadsPage({lead}) {
    return (
        <LeadView lead={lead} />
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
    const {result} = await api.get(`leads/${id}`).then(res => res.data);
    
    return {
        props: {
            lead: result ?? null,
        }
    }
}