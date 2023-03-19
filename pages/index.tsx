import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useSession, signIn, getSession, signOut } from "next-auth/react";
import { useEffect } from 'react';
import { Home } from '@/src/screens/Site/Home';

const inter = Inter({ subsets: ['latin'] })

export default function HomePage() {
  const { data, status }: any = useSession();

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Home />
  )
}