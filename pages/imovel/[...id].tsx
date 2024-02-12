import Head from "next/head";
import { api } from "@/src/services/api";
import { Property } from "@/src/ui/screens/Site/Property";
import { GetServerSideProps } from "next";
import { Box, Container, Typography } from "@mui/material";

export default function PropertyPage({ properties, property }) {
    if (!property) {
        return (
            <Box sx={{
                mt: '64px',
                pt: {
                    sx: 0,
                    md: 3
                },
                minHeight: '70vh',
                background: `#fafafa`
            }}>
                <Container>
                    <Typography fontSize={18} fontWeight={600}>Imóvel não foi encontrado ou não está mais disponível</Typography>
                </Container>
            </Box>
        )
    }
    return (
        <>
            <Head>
                <meta name='robots' content='index, follow' />
            </Head>
            <Property properties={properties} property={property} />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { id } = ctx.query;
    const code = id[id.length - 1];

    const { property } = await api.get(`properties/code/${code}`).then(res => res.data);
    const { results, count } = await api.get(`properties?status=disponivel`).then(res => res.data);

    return {
        props: {
            property: property.status == 'disponivel' ? property : null,
            properties: results ?? [],
            total: count ?? 0
        }
    }
}