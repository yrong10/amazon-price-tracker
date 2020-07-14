import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchItem, editItem } from "../../actions/itemActions";
import { Grid, Form, Segment, Header, Button } from "semantic-ui-react";

class ItemEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      target: "",
      loading: false,
      errors: {},
    };
  }

  async componentDidMount() {
    this.props.fetchItem(this.props.userId, this.props.match.params.id);
    const { name, target } = this.props.item;
    this.setState({
      name,
      target,
    });
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { errors, isValid } = this.validate(this.state);

    if (isValid) {
      this.setState({ loading: true, errors: {} });
      const item = {
        id: this.props.item.id,
        name: this.state.name,
        target: this.state.target.toString(),
      };
      this.props.editItem(item, this.props.history);
    } else {
      this.setState({ errors });
    }
  };

  validate = (itemData) => {
    let errors = {};
    let isValid = true;
    if (!itemData.name) {
      errors.name = "Name is required";
      isValid = false;
    }

    if (!itemData.target) {
      errors.target = "Target price is required";
      isValid = false;
    } else if (itemData.target <= 0) {
      errors.target = "Target price must be positive";
      isValid = false;
    }

    return { errors, isValid };
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
            Edit Item
          </Header>
          <Form size="large" onSubmit={this.onSubmit}>
            <Segment stacked>
              <Form.Input
                label="Item Name"
                onChange={this.onChange}
                value={this.state.name}
                error={errors.name}
                id="name"
                type="text"
              />
              <Form.Input
                label="URL"
                value={this.props.item.url}
                id="url"
                type="text"
                readOnly
              />
              <Form.Input
                label="ASIN"
                value={this.props.item.asin}
                id="asin"
                type="text"
                readOnly
              />
              <Form.Input
                label="Current Price"
                value={this.props.item.current}
                id="current"
                type="number"
                readOnly
              />
              <Form.Input
                label="Target Price"
                onChange={this.onChange}
                value={this.state.target}
                error={errors.target}
                id="target"
                type="number"
              />
              <Button primary type="submit" className={active}>
                Edit Item
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

const mapStateToProps = (state, ownProps) => {
  return {
    item: state.items.filter((item) => item.id === ownProps.match.params.id)[0],
    userId: state.auth.user.id,
  };
};

export default connect(mapStateToProps, { fetchItem, editItem })(
  withRouter(ItemEdit)
);
