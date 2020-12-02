import React from "react";
import { NextPage } from "next";
import Layout from "@components/Layout";
import SportCreate from "@components/Sport/Create";

type CreateSportPageProps = unknown;
const CreateSportPage: NextPage<CreateSportPageProps> = () => {
    return (
        <Layout title="Create a new Sport">
            <SportCreate />
        </Layout>
    );
};

export default CreateSportPage;
