import React from "react";
import { NextPage } from "next";
import Layout from "@components/Layout";

type IndexPageProps = unknown;
const IndexPage: NextPage<IndexPageProps> = () => {
    return (
        <Layout title="Events">
            <div>Some real content</div>
        </Layout>
    );
};

export default IndexPage;
