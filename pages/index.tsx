import Head from "next/head";
import { api } from '@/src/services/api';
import { Home } from '@/src/ui/screens/Site/Home';
import { GetServerSideProps } from 'next';

export default function HomePage({ properties, banners, realtors }) {
  return (
    <>
      <Head>
        <meta name='robots' content='index, follow' />
      </Head>
      <Home properties={properties} banners={banners} realtors={realtors}/>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { results, count } = await api.get('properties').then(res => res.data);
  const { results: resultsBanner } = await api.get('banners?bannerTypeId=4').then(res => res.data);
  const { results: resultsRealtors} = await api.get('users/realtors').then(res => res.data);

  return {
    props: {
      realtors: resultsRealtors ?? [],
      banners: resultsBanner ?? [],
      properties: results ?? [],
      total: count ?? 0,
    }
  }
}