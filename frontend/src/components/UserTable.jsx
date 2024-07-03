import { useContext, useState } from "react";
import { Table, Button, Spinner } from "react-bootstrap";
import { useUserContext } from "../context/UserContext.jsx";
import UserFormModal from "./UserFormModal";
import "../index.css";
import CustomPagination from "./Pagination.jsx";

const UserTable = () => {
  const { users, loading, error, handleDeleteUser, setSelectedUser } =
    useUserContext();
  const handleEditUser = (user) => {
    setSelectedUser(user);
  };

  const onDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      handleDeleteUser(userId);
    }
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  return (
    <>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="user-table-align">{user.firstName}</td>
              <td className="user-table-align">{user.lastName}</td>
              <td className="user-table-align">{user.email}</td>
              <td className="d-flex justify-content-center align-items-center gap-2">
                <Button
                  variant="outline-primary"
                  className="action-btn"
                  onClick={() => handleEditUser(user)}
                >
                  Edit
                </Button>
                <Button
                  className="action-btn"
                  onClick={() => onDelete(user._id)}
                  variant="outline-danger"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* <CustomPagination /> */}
    </>
  );
};

export default UserTable;
