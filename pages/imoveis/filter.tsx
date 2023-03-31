import { api } from "@/src/services/api";
import { PropertiesFilter } from "@/src/ui/screens/Site/PropertiesFilter";
import { GetServerSideProps } from "next";

export default function FilterPage({properties, total}) {
    return (
        <PropertiesFilter properties={properties} total={total}/>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { results, count } = await api.get('properties').then(res => res.data);

    return {
        props: {
            properties: results ?? [],
            total: count ?? 0
        }
    }
}