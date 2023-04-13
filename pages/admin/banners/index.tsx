import { GetServerSideProps } from "next";
import BannersProvider from "@/src/contexts/BannersContext";
import { Banners } from "@/src/ui/screens/Admin/Banners";
import { parseCookies } from "nookies";
import { api } from "@/src/services/api";

export default function BannersPage({banners, total}) {
    return (
        <BannersProvider>
            <Banners banners={banners} total={total}/>
        </BannersProvider>
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
    const {results, total} = await api.get('banners').then(res => res.data);

    return {
        props: {
            banners: results ?? [],
            total: total ?? 0,
        }
    }
}