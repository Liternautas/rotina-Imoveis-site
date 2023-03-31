import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useSession, signIn, getSession, signOut } from "next-auth/react";
import { useEffect } from 'react';
import { Home } from '@/src/ui/screens/Site/Home';
import { GetServerSideProps } from 'next';
import { api } from '@/src/services/api';

const inter = Inter({ subsets: ['latin'] })

export default function HomePage({properties}) {
  const { data, status }: any = useSession();

  useEffect(() => {
    console.log(data);
  }, [data]);

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