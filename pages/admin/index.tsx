import { useAuth } from "@/src/contexts/AuthContext";
import { GetServerSideProps } from "next";

export default function AdminPage() {
    const {loading} = useAuth();
    return (
        <div>{!loading && <h1>OPA</h1>}</div>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    return {
        props: {}
    }
  }