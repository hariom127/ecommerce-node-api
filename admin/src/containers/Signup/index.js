import React from "react";
import Layout from "../../components/Layout";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import Input from "../../components/UI/Input";

const Signup = () => {
  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: "50px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form>
              <Row>
                <Col md={6}>
                  <Input
                    label="First Name"
                    type="text"
                    placeholder="Enter First Name"
                  />
                </Col>
                <Col md={6}>
                  <Input
                    label="Last Name"
                    type="text"
                    placeholder="Enter Last Name"
                  />
                </Col>
              </Row>
              <Input label="Email" type="email" placeholder="Enter Email" />
              <Input
                label="Password"
                type="password"
                placeholder="Enter Password"
              />
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Signup;
