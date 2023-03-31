import { Home } from '@/src/ui/screens/Site/Home';
import { GetServerSideProps } from 'next';

export default function HomePage({properties}) {
  return (
    <Home properties={properties}/>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  //const { results, count } = await api.get('properties').then(res => res.data);
  /* console.log(results); */

  return {
      props: {
          properties: /* results ?? [] */ [],
          total: /* count ?? */ 0
      }
  }
}