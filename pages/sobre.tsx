import Head from "next/head";
import { About } from "@/src/ui/screens/Site/About";

export default function AboutPage() {
    return (
        <>
            <Head>
                <meta name='robots' content='index, follow' />
            </Head>
            <About />
        </>
    )
}