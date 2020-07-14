import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import {
  Grid,
  Form,
  Segment,
  Header,
  Button,
  Message,
  Icon,
} from "semantic-ui-react";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 500 }} textAlign="left">
          <Header as="h2" textAlign="center">
            <Icon name="add user" />
            Sign Up
          </Header>
          <Header as="h3">
            <Link to="/" style={{ color: "black" }}>
              <Icon name="arrow left" />
            </Link>
            Back to home
          </Header>
          <Form size="large" onSubmit={this.onSubmit}>
            <Segment stacked>
              <Form.Input
                label="User Name"
                placeholder="User Name"
                onChange={this.onChange}
                value={this.state.name}
                error={errors.name}
                id="name"
                type="text"
              />
              <Form.Input
                label="Email Address"
                placeholder="Email Address"
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
                id="email"
                type="text"
              />
              <Form.Input
                label="Password"
                placeholder="Password"
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
                id="password"
                type="password"
              />
              <Form.Input
                label="Confirm Password"
                placeholder="Confirm Password"
                onChange={this.onChange}
                value={this.state.password2}
                error={errors.password2}
                id="password2"
                type="password"
              />
              <Button primary type="submit">
                Sign Up
              </Button>
            </Segment>
          </Form>
          <Message>
            Already have an account? <Link to="/login">Sign In</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
