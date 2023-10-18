import Head from "next/head";
import { api } from '@/src/services/api';
import { Home } from '@/src/ui/screens/Site/Home';
import { GetServerSideProps } from 'next';
import useSWR from 'swr';

export default function HomePage() {
  const properties = useSWR('properties', async () => await api.get(`properties?status=disponivel&emphasis=true`).then(res => res.data));
  const otherProperties = useSWR('otherProperties', async () => await api.get(`properties?status=disponivel`).then(res => res.data));
  const banners = useSWR('banners?bannerTypeId=4', async () => await api.get('banners?bannerTypeId=4').then(res => res.data));
  const realtors = useSWR('users', async () => await api.get('users').then(res => res.data));

  return (
    <>
      <Head>
        <meta name='robots' content='index, follow' />
      </Head>
      <Home properties={properties?.data?.results ?? []} otherProperties={otherProperties?.data?.results ?? []} banners={banners?.data?.results ?? []} realtors={realtors?.data?.results ?? []}/>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cacheTime = 86400;
  const cacheControl = `public, max-age=${cacheTime}`;
  ctx.res.setHeader(
    'Cache-Control',
    cacheControl
  )
  return {
    props: {}
  }
}
