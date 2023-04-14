import Head from 'next/head';
import { Contact } from "@/src/ui/screens/Site/Contact";
import { HeadComponent } from '@/src/ui/components/HeadComponent';

export default function ContactPage() {
    return (
        <>
            <HeadComponent
                title='Contato - Rotina Imóveis'
                description='Entre em contato conosco para mais informações sobre nossos serviços imobiliários. Estamos prontos para ajudá-lo(a) a encontrar a melhor solução para suas necessidades.'
            >
                <meta name='robots' content='index, follow' />
            </HeadComponent>
            <Contact />
        </>
    )
}