import { useAuth } from "@/src/contexts/AuthContext";
import { api } from "@/src/services/api";
import { Dashboard } from "@/src/ui/screens/Admin/Dashboard";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

export default function AdminPage({properties, propertiesByMonth, types, leads, salesContracts, rentalContracts, rentalContractsData}) {
    const { loading } = useAuth();
    return (
        <Dashboard
            properties={properties}
            propertiesByMonth={propertiesByMonth}
            salesContracts={salesContracts}
            rentalContracts={rentalContracts}
            rentalContractsData={rentalContractsData}
            types={types}
            leads={leads}
        />
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

    const res = await api.get(`dashboard`).then(res => res.data);
    const types = await api.get(`property-types`).then(res => res.data);

    return {
        props: {
            properties: res.properties ?? null,
            propertiesByMonth: res.propertiesByMonth ?? null,
            leads: res.leads ?? null,
            salesContracts: res.salesContracts ?? null,
            rentalContracts: res.rentalContracts ?? null,
            rentalContractsData: res.rentalContractsData ?? null,
            types: types ?? null,
        }
    }
}