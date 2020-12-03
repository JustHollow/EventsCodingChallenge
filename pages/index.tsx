import React from "react";
import { NextPage } from "next";
import Layout from "@components/Layout";
import Events from "@components/Events/List";
import Sports from "@components/Sport/List";
import { Grid, Typography } from "@material-ui/core";

type IndexPageProps = unknown;
const IndexPage: NextPage<IndexPageProps> = () => {
    return (
        <Layout title="Events">
            <Grid container spacing={6}>
                <Grid item container>
                    <Typography variant="h3">Sport list</Typography>
                    <Sports />
                </Grid>
                <Grid item>
                    <Typography variant="h3">Events list</Typography>
                    <Events />
                </Grid>
            </Grid>
        </Layout>
    );
};

export default IndexPage;
