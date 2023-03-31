import { Deals } from "@/src/ui/screens/Admin/Deals";
import { GetServerSideProps } from "next";

export default function DealsPage() {
    return (
        <Deals />
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    return {
        props: {}
    }
  }