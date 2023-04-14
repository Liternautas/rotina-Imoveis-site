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
            {title && <title>{title}</title>}
            {title && <meta name="og:title" content={title} />}
            {description && <meta property="og:description" content={description}></meta>}
            {image && <meta property="og:image" content={getImageUrl(image)}></meta>}
            {urlCanonical && <meta property="og:url" content={urlCanonical}></meta>}
            <meta property="og:site_name" content="Kelly Imóveis"></meta>
            <link rel="shortcut icon" href="/icon.png" />

            {!title && <title>Rotina Imóveis - Encontre o seu lar ideal</title>}
            {!title && <meta name="og:title" content={'Rotina Imóveis - Encontre o seu lar ideal'} />}
            {!description &&  <meta property="og:description" content={'A Rotina Imóveis é a sua imobiliária de confiança. Encontre as melhores opções de imóveis para venda e aluguel com atendimento personalizado e suporte em todas as etapas da negociação.'}></meta>}
            {!image && <meta property="og:image" content={getImageUrl(null)}></meta>}
            {!urlCanonical && url && <meta property="og:url" content={url} />}
        </Head>
    )
}