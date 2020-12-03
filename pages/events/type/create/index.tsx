import React from "react";
import { NextPage } from "next";
import Layout from "@components/Layout";
import EventsTypeCreate from "@components/EventsType/Create";

type CreateEventPageProps = unknown;
const CreateEventPage: NextPage<CreateEventPageProps> = () => {
    return (
        <Layout title="Create a new event">
            <EventsTypeCreate />
        </Layout>
    );
};

export default CreateEventPage;
