import { GetServerSideProps } from "next";

import { CreateBanner } from "@/src/ui/screens/Admin/Banners/create";
import { parseCookies } from "nookies";
import { api } from "@/src/services/api";
import BannersProvider from "@/src/contexts/BannersContext";
import { UpdateBanner } from "@/src/ui/screens/Admin/Banners/update";

export default function UpdateBannerPage({ types, banner }) {
    return (
        <BannersProvider>
            <UpdateBanner types={types} banner={banner}/>
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
    const types = await api.get('banner-types').then(res => res.data);
    const {banner} = await api.get(`banners/${ctx.query.id}`).then(res => res.data);

    return {
        props: {
            types: types ?? [],
            banner: banner ?? null
        }
    }
}