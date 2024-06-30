import { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useForm } from "../hooks/useForm";
import { useUserContext } from "../context/UserContext";

const UserFormModal = () => {
  const { addUser, editUser, selectedUser } = useUserContext(); // Using context for state management
  const { values, setValues, handleChange, resetForm } = useForm({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (selectedUser) {
      // If selectedUser is set, populate form fields for editing
      setValues({
        firstName: selectedUser.firstName || "",
        lastName: selectedUser.lastName || "",
        email: selectedUser.email || "",
      });
    } else {
      // Clear form fields if no selectedUser (for adding new user)
      setValues({
        firstName: "",
        lastName: "",
        email: "",
      });
    }
  }, [selectedUser, setValues]);

  const handleClose = () => {
    setShow(false);
    resetForm();
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    console.log("Submit button clicked");
    if (selectedUser) {
      // Update existing user
      editUser(selectedUser._id, values);
    } else {
      // Add new user
      addUser(values);
      console.log("hi clicked");
    }
    handleClose(); // Close modal after submission
  };

  const printHello = () => {
    console.log("ehllo");
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {selectedUser ? "Edit User" : "Add User"}
      </Button>

      <Modal show={show} onHide={handleClose} size="md">
        <Modal.Header closeButton>
          <Modal.Title>{selectedUser ? "Edit User" : "Add User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} className="mb-3" controlId="formFirstName">
              <Form.Label column sm="3">
                First Name
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formLastName">
              <Form.Label column sm="3">
                Last Name
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formEmail">
              <Form.Label column sm="3">
                Email
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>

            <Button
              id="addUser"
              variant="primary"
              type="submit"
              onClick={handleSubmit}
            >
              {selectedUser ? "Update" : "Submit"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UserFormModal;
