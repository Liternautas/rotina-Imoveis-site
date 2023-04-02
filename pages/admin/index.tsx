import { useAuth } from "@/src/contexts/AuthContext";
import { Dashboard } from "@/src/ui/screens/Admin/Dashboard";
import { GetServerSideProps } from "next";

export default function AdminPage() {
    const {loading} = useAuth();
    return (
        <Dashboard />
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    return {
        props: {}
    }
  }