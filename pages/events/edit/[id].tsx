import React from "react";
import { GetServerSideProps, NextPage } from "next";
import Layout from "@components/Layout";
import EventEdit from "@components/Events/Edit";

type EditEventPageProps = { id: string };
const EditEventPage: NextPage<EditEventPageProps> = ({ id }) => {
    return (
        <Layout title="Event details">
            <EventEdit id={id} />
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps<EditEventPageProps> = async (
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

export default EditEventPage;
