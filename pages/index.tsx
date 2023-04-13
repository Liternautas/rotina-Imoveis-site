import { api } from '@/src/services/api';
import { Home } from '@/src/ui/screens/Site/Home';
import { GetServerSideProps } from 'next';

export default function HomePage({properties, banners}) {
  return (
    <Home properties={properties} banners={banners}/>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { results, count } = await api.get('properties').then(res => res.data);
  const { results: resultsBanner } = await api.get('banners?bannerTypeId=4').then(res => res.data);

  return {
      props: {
          properties: results ?? [],
          banners: resultsBanner ?? [],
          total: count ?? 0
      }
  }
}