import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createItem } from "../../actions/itemActions";
import { Grid, Form, Segment, Header, Button } from "semantic-ui-react";

class ItemCreate extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      target: "",
      loading: false,
      errors: {},
    };
  }

  componentDidMount() {
    this.setState({
      name: this.props.details.name,
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
      const newItem = {
        itemName: this.props.details.name,
        name: this.state.name,
        url: this.props.details.url,
        asin: this.props.details.asin,
        current: this.props.details.price,
        target: this.state.target,
      };

      this.props.createItem(newItem, this.props.history);
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
            Add Item
          </Header>
          <Form size="large" onSubmit={this.onSubmit}>
            <Segment stacked>
              <Form.Input
                label="Item Name"
                placeholder="Item Name"
                onChange={this.onChange}
                value={this.state.name}
                error={errors.name}
                id="name"
                type="text"
              />
              <Form.Input
                label="URL"
                value={this.props.details.url}
                id="url"
                type="text"
                readOnly
              />
              <Form.Input
                label="ASIN"
                value={this.props.details.asin}
                id="asin"
                type="text"
                readOnly
              />
              <Form.Input
                label="Current Price"
                value={this.props.details.price}
                id="current"
                type="number"
                readOnly
              />
              <Form.Input
                label="Target Price"
                placeholder="Target Price"
                onChange={this.onChange}
                value={this.state.target}
                error={errors.target}
                id="target"
                type="number"
              />
              <Button primary type="submit" className={active}>
                Add Item
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
  items: state.items,
});

export default connect(mapStateToProps, { createItem })(withRouter(ItemCreate));
