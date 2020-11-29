import React from "react";
import { NextPage } from "next";
import Layout from "@components/Layout";
import Events from "@components/Events/List";

type IndexPageProps = unknown;
const IndexPage: NextPage<IndexPageProps> = () => {
    return (
        <Layout title="Events">
            <Events />
        </Layout>
    );
};

export default IndexPage;
