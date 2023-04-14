import Head from 'next/head';
import { Contact } from "@/src/ui/screens/Site/Contact";

export default function ContactPage() {
    return (
        <>
            <Head>
                <meta name='robots' content='index, follow' />
            </Head>
            <Contact />
        </>
    )
}