import Head from "next/head";
import { About } from "@/src/ui/screens/Site/About";
import { HeadComponent } from "@/src/ui/components/HeadComponent";

export default function AboutPage() {
    return (
        <>
            <HeadComponent
                title='Sobre - Rotina Imóveis'
                description='A Rotina Imóveis é uma empresa do setor imobiliário que atua na cidade de Catalão, Goiás. Fundada em 2000, a empresa tem como missão oferecer serviços de qualidade e soluções eficientes para seus clientes, sempre buscando a satisfação dos mesmos através de um atendimento personalizado e transparente.'
            >
                <meta name='robots' content='index, follow' />
            </HeadComponent>
            <About />
        </>
    )
}