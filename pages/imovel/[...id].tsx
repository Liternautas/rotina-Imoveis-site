import { api } from "@/src/services/api";
import { Property } from "@/src/ui/screens/Site/Property";
import { GetServerSideProps } from "next";

export default function PropertyPage({properties, property}) {
    return (
        <Property properties={properties} property={property}/>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const {id} = ctx.query;
    const code = id[id.length - 1];

    const { results, count } = await api.get('properties').then(res => res.data);
    const { property } = await api.get(`properties/code/${code}`).then(res => res.data);
  
    return {
        props: {
            property: property ?? null,
            properties: results ?? [],
            total: count ?? 0
        }
    }
  }