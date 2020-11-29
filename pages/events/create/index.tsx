import React from "react";
import { NextPage } from "next";
import Layout from "@components/Layout";
import EventCreate from "@components/Events/Create";

type CreateEventPageProps = unknown;
const CreateEventPage: NextPage<CreateEventPageProps> = () => {
    return (
        <Layout title="Create a new event">
            <EventCreate />
        </Layout>
    );
};

export default CreateEventPage;
