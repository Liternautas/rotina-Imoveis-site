import Head from "next/head";
import { api } from '@/src/services/api';
import { Home } from '@/src/ui/screens/Site/Home';
import { GetServerSideProps } from 'next';
import useSWR from 'swr'
import { useEffect } from "react";

export default function HomePage() {
  const properties = useSWR('properties', async () => await api.get('properties').then(res => res.data));
  const banners = useSWR('banners?bannerTypeId=4', async () => await api.get('banners?bannerTypeId=4').then(res => res.data));
  const realtors = useSWR('users/realtors', async () => await api.get('users/realtors').then(res => res.data));

  useEffect(() => {
    console.log(properties);
  }, [properties]);

  return (
    <>
      <Head>
        <meta name='robots' content='index, follow' />
      </Head>
      <Home properties={properties?.data?.results ?? []} banners={banners?.data?.results ?? []} realtors={realtors?.data?.results ?? []}/>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  ctx.res.setHeader(
    'Cache-Control',
    'public, s-maxage=3600, stale-while-revalidate=3600'
  )

  return {
    props: {}
  }
}