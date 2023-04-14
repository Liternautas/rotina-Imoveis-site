import {useEffect, useState} from "react";
import Head from "next/head";
import { getImageUrl } from "@/src/helpers/functions";
import Script from "next/script";

interface Props {
    title?: string;
    description?: string;
    image?: string;
    urlCanonical?: string;
}

export function HeadComponent({ title, description, image, urlCanonical }: Props) {
    const [url, setUrl] = useState('');

    useEffect(() => {
        setUrl(window && window?.location?.origin);
    }, []);

    return (
        <Head>
            <meta property="og:site_name" content="Rotina Imóveis"></meta>
            <link rel="icon" type="image/png" href="/icon.png" />
            <meta name="google-site-verification" content="8uvV-LECSLo4d8UIsChZLLnuolgkLXFykaWOh6_lyl0" />
            <meta name="keywords" content="rotina imóveis, rotina imobiliária, imobiliária catalão, imobiliária goiás, compra de imóveis catalão, venda de imóveis catalão, aluguel de imóveis catalão, imóveis em catalão, casas em catalão, apartamentos em catalão, terrenos em catalão"></meta>
            
            {title && <title>{title}</title>}
            {title && <meta name="og:title" content={title} />}
            {description && <meta property="og:description" content={description}></meta>}
            {image && <meta property="og:image" content={getImageUrl(image)}></meta>}
            {urlCanonical && <meta property="og:url" content={urlCanonical}></meta>}

            {!title && <title>Rotina Imóveis - Imobiliária em Catalão, Goiás | Venda, Compra e Aluguel de Imóveis</title>}
            {!title && <meta name="og:title" content={'Rotina Imóveis - Imobiliária em Catalão, Goiás | Venda, Compra e Aluguel de Imóveis'} />}
            {!description &&  <meta property="og:description" content={'A Rotina Imóveis é a sua imobiliária de confiança em Catalão, Goiás. Encontre as melhores opções de imóveis para venda e aluguel com atendimento personalizado e suporte em todas as etapas da negociação.'}></meta>}
            {!image && <meta property="og:image" content={getImageUrl(null)}></meta>}
            {!urlCanonical && url && <meta property="og:url" content={url} />}
        </Head>
    )
}