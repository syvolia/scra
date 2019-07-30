import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import ModalForm from "../Modals/Modal";

class DataTable extends Component {
  deleteItem = id => {
    let confirmDelete = window.confirm("Delete item forever?");
    if (confirmDelete) {
      fetch("http://localhost:3000/crud", {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      })
        .then(response => response.json())
        .then(item => {
          this.props.deleteItemFromState(id);
        })
        .catch(err => console.log(err));
    }
  };

  /**
   * This method takes the array
   * maps through it
   * @returns Table components to be rendered to the table
   */
  renderTableItems = () => {
    const { items } = this.props;
   console.log(this.props);
    return (
      <div>
        {items.map(item => (
          <tr key={item.id}>
            <th scope="row">{item.id}</th>
            <td>{item.firstname}</td>
            <td>{item.lastname}</td>
            <td>{item.email}</td>
            <td>{item.phonenumber}</td>
            <td>{item.status}</td>
            <td>{item.role}</td>
            <td>
              <row style={{ width: "110px" }}>
                <ModalForm
                  buttonLabel="Edit"
                  item={item}
                  updateState={this.props.updateState}
                />{" "}
                <Button color="danger" onClick={() => this.deleteItem(item.id)}>
                  Del
                </Button>
              </row>
            </td>
          </tr>
        ))}
      </div>
    );
  };

  render() {
    return (
      <React.Fragment responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Email</th>
            <th>PhoneNumber</th>
            <th>Status</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        {/* We call the method to that renders the table contents from the items array */}
        <tbody>{this.renderTableItems()}</tbody>
      </React.Fragment>
    );
  }
}

export default DataTable;
