import Head from "next/head";
import { useRouter } from "next/router";
import { api } from "@/src/services/api";
import { PropertiesFilter } from "@/src/ui/screens/Site/PropertiesFilter";
import { GetServerSideProps } from "next";
import { HeadComponent } from "@/src/ui/components/HeadComponent";

export default function FilterPage({ properties, total }) {
    const router = useRouter();
    const {adType, type} = router.query; 

    function formatarMensagem(type, adType) {
        // Transforma a primeira letra do tipo em maiúscula
        const tipoFormatado = type ? type.charAt(0).toUpperCase() + type.slice(1) + ' ' : 'Imóveis ';
        
        // Transforma a primeira letra da finalidade em maiúscula e adiciona um traço
        const finalidadeFormatada = adType ?? '';
        
        // Retorna a mensagem formatada
        return `${tipoFormatado}${finalidadeFormatada} - Rotina Imóveis`;
      }

    return (
        <>
            <HeadComponent
                title={`${formatarMensagem(type, adType)}`}
            >
                <meta name='robots' content='index, follow' />
            </HeadComponent>
            <PropertiesFilter properties={properties} total={total} />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { results, count } = await api.get('properties?status=disponivel').then(res => res.data);

    return {
        props: {
            properties: results ?? [],
            total: count ?? 0
        }
    }
}