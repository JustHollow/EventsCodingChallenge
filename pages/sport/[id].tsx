import React from "react";
import { GetServerSideProps, NextPage } from "next";
import Layout from "@components/Layout";
import SportDetail from "@components/Sport/Detail";

type SportPageProps = { id: string };
const CreateSportPage: NextPage<SportPageProps> = ({ id }) => {
    return (
        <Layout title="Sport details">
            <SportDetail id={id} />
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps<SportPageProps> = async (
    context
) => {
    return {
        props: {
            id: Array.isArray(context.params?.id)
                ? context.params.id[0]
                : context.params.id,
        },
    };
};

export default CreateSportPage;
