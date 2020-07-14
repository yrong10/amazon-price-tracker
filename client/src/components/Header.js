import React from "react";
import { Menu, Button, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { Link } from "react-router-dom";

class Header extends React.Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    return (
      <Menu pointing secondary>
        <Menu.Item>
          <Link
            to="/dashboard/new"
            className="ui small icon primary left floated left labeled button"
          >
            <Icon name="amazon" /> Add Item
          </Link>
        </Menu.Item>
        <Menu.Item position="right">
          <Button negative onClick={this.onLogoutClick}>
            Logout
          </Button>
        </Menu.Item>
      </Menu>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Header);
