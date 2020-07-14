import React from "react";
import { Link } from "react-router-dom";
import { Container, Header, Segment, Icon } from "semantic-ui-react";

const Home = () => (
  <Container text>
    <Segment
      textAlign="center"
      style={{ minHeight: 700, padding: "1em 0em" }}
      vertical
    >
      <Header
        as="h1"
        content="Amazon Price Tracker"
        style={{
          fontSize: "4em",
          fontWeight: "normal",
          marginBottom: 0,
          marginTop: "3em",
        }}
      />
      <Header
        as="h2"
        content="An Amazon item price tracker created with React frontend with a Node/Express backend."
        style={{
          fontSize: "1.7em",
          fontWeight: "normal",
          marginTop: "1.5em",
        }}
      />
      <Link to="/register" className="ui icon right labeled big button primary">
        Sign Up
        <Icon name="add user" />
      </Link>
      <Link to="/login" className="ui icon right labeled big button primary">
        Sign In
        <Icon name="sign-in" />
      </Link>
    </Segment>
  </Container>
);

export default Home;
