import _ from "lodash";
import React from "react";
import { Table, Button, Icon, Modal } from "semantic-ui-react";
import { fetchItems, deleteItem } from "../../actions/itemActions";
import { deleteDetails } from "../../actions/detailActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Header from "../Header";

class ItemTable extends React.Component {
  async componentDidMount() {
    await this.props.fetchItems(this.props.userId);
    this.props.deleteDetails();
    this.setState({ data: this.props.items });
  }

  state = {
    column: null,
    data: [],
    direction: null,
    modalOpen: false,
    modalItem: null,
    modalItemId: null,
    modalItemRef: null,
  };

  handleSort = (clickedColumn) => () => {
    const { column, data, direction } = this.state;
    for (let item of data) {
      item["below"] = item.current <= item.target;
    }

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: "ascending",
      });

      return;
    }

    this.setState({
      data: data.reverse(),
      direction: direction === "ascending" ? "descending" : "ascending",
    });
  };

  render() {
    const { column, data, direction } = this.state;

    return (
      <div>
        <Header />
        <Table sortable celled fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={column === "below" ? direction : null}
                onClick={this.handleSort("below")}
              >
                Below Target Price
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "name" ? direction : null}
                onClick={this.handleSort("name")}
              >
                Name
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "current" ? direction : null}
                onClick={this.handleSort("current")}
              >
                Current Price
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "target" ? direction : null}
                onClick={this.handleSort("target")}
              >
                Target Price
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "date" ? direction : null}
                onClick={this.handleSort("date")}
              >
                Added date
              </Table.HeaderCell>
              <Table.HeaderCell>Edit</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {_.map(data, ({ id, name, url, current, target, date, itemId }) => (
              <Table.Row key={id}>
                <Table.Cell
                  className={current <= target ? "positive" : "negative"}
                  textAlign="center"
                >
                  <Icon name={current <= target ? "checkmark" : "close"} />
                </Table.Cell>
                <Table.Cell>
                  <a href={url}>{name}</a>
                </Table.Cell>
                <Table.Cell>{current}</Table.Cell>
                <Table.Cell>{target}</Table.Cell>
                <Table.Cell>{date.slice(0, 10)}</Table.Cell>
                <Table.Cell>
                  <Button
                    as={Link}
                    primary
                    size="small"
                    to={`/dashboard/edit/${id}`}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    negative
                    onClick={() =>
                      this.setState({
                        modalOpen: true,
                        modalItem: name,
                        modalItemRef: id,
                        modalItemId: itemId,
                      })
                    }
                  >
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Modal
          size="small"
          open={this.state.modalOpen}
          onClose={() => this.setState({ modalOpen: false })}
        >
          <Modal.Header>Delete Item</Modal.Header>
          <Modal.Content>
            <p>
              Are you sure you want to delete item <b>{this.state.modalItem}</b>
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={() => this.setState({ modalOpen: false })}>
              No
            </Button>
            <Button
              negative
              content="Yes"
              onClick={() =>
                this.props.deleteItem(
                  this.props.userId,
                  this.state.modalItemRef,
                  this.state.modalItemId,
                  this.props.history
                )
              }
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.user.id,
    items: Object.values(state.items),
  };
};

export default connect(mapStateToProps, {
  fetchItems,
  deleteItem,
  deleteDetails,
})(ItemTable);
