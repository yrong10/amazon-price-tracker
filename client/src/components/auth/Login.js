import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import {
  Grid,
  Form,
  Segment,
  Header,
  Button,
  Message,
  Icon,
} from "semantic-ui-react";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
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

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(userData, this.props.history);
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
            <Icon name="sign in" />
            Sign In
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
                label="Email Address"
                placeholder="Email Address"
                fluid
                icon="mail"
                iconPosition="left"
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
                id="email"
                type="text"
              />
              <Form.Input
                label="Password"
                placeholder="Password"
                fluid
                icon="lock"
                iconPosition="left"
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
                id="password"
                type="password"
              />
              <Button primary type="submit">
                Sign In
              </Button>
            </Segment>
          </Form>
          <Message>
            Don't have an account? <Link to="/register">Sign Up</Link>
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

export default connect(mapStateToProps, { loginUser })(withRouter(Login));
