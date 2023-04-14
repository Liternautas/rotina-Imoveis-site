import { useAuth } from "@/src/contexts/AuthContext";
import { Dashboard } from "@/src/ui/screens/Admin/Dashboard";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

export default function AdminPage() {
    const {loading} = useAuth();
    return (
        <Dashboard />
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

    return {
        props: {}
    }
  }