import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getDetails } from "../../actions/detailActions";
import { Grid, Form, Segment, Header, Button } from "semantic-ui-react";

class ItemGetDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      url: "",
      loading: false,
      errors: {},
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
        loading: false,
      });
    }
    if (nextProps.details.price) {
      this.props.history.push("/dashboard/new/add");
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true, errors: {} });

    const urlData = {
      url: this.state.url,
    };

    this.props.getDetails(urlData);
  };

  render() {
    const { errors, loading } = this.state;
    let active = loading ? "loading" : "";
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 500 }} textAlign="left">
          <Header as="h2" textAlign="center">
            Add Item
          </Header>
          <Form size="large" onSubmit={this.onSubmit}>
            <Segment stacked>
              <Form.Input
                label="Please enter the Amazon link"
                placeholder="URL"
                onChange={this.onChange}
                value={this.state.url}
                error={errors.url}
                id="url"
                type="text"
              />
              <Button primary type="submit" className={active}>
                Next
              </Button>
              <Link to="/dashboard" className="ui button">
                Cancel
              </Link>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  details: state.details,
  errors: state.errors,
});

export default connect(mapStateToProps, { getDetails })(
  withRouter(ItemGetDetails)
);
