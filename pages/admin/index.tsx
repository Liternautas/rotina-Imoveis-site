import { useAuth } from "@/src/contexts/AuthContext";

export default function AdminPage() {
    const {loading} = useAuth();
    return (
        <div>{!loading && <h1>OPA</h1>}</div>
    )
}