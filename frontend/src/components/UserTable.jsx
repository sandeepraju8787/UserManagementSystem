import { useContext, useState } from "react";
import { Table, Button, Spinner } from "react-bootstrap";
import { UserContext } from "../context/UserContext.jsx";
import UserFormModal from "./UserFormModal";

const UserTable = () => {
  const { users, loading, error, handleDeleteUser, setSelectedUser } =
    useContext(UserContext);
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
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>
              <Button variant="warning" onClick={() => handleEditUser(user)}>
                Edit
              </Button>
              <Button onClick={() => onDelete(user._id)} variant="danger">
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UserTable;
