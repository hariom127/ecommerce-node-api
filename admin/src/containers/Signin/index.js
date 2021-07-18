import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import Input from "../../components/UI/Input";
import { login, isUserLogedIn } from "../../redux/action/authAction";
import { Redirect } from "react-router-dom";

const Signin = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");
  const auth = useSelector((state) => state.login);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLogedIn());
    }
  }, []);

  // call api and get data
  const sendLoginRequest = async (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    dispatch(login(user));
  };

  // if user loged in redirect to on dashboard
  if (auth.authenticate) {
    return <Redirect to={`/`} />;
  }
  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: "50px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={sendLoginRequest}>
              <Input
                label="Username"
                type="text"
                placeholder="Enter Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Password"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

export default Signin;
