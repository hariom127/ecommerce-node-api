import React from "react";
import Layout from "../../components/Layout";
import { Jumbotron } from "react-bootstrap";

const Home = (props) => {
  return (
    <Layout>
      <Jumbotron>
        <h1>Welcome to admin</h1>
      </Jumbotron>
    </Layout>
  );
};

export default Home;
