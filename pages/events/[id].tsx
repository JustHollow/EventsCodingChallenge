import React from "react";
import { GetServerSideProps, NextPage } from "next";
import Layout from "@components/Layout";
import EventDetail from "@components/Events/Detail";

type EventPageProps = { id: string };
const CreateEventPage: NextPage<EventPageProps> = ({ id }) => {
    return (
        <Layout title="Event details">
            <EventDetail id={id} />
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps<EventPageProps> = async (
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

export default CreateEventPage;
