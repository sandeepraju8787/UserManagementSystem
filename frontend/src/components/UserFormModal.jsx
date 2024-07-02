import { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useForm } from "../hooks/useForm";
import { useUserContext } from "../context/UserContext";

const UserFormModal = () => {
  const { addUser, editUser, selectedUser, setSelectedUser } = useUserContext();
  const { values, setValues, handleChange, resetForm } = useForm({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (selectedUser) {
      setValues({
        firstName: selectedUser.firstName || "",
        lastName: selectedUser.lastName || "",
        email: selectedUser.email || "",
      });
      setShow(true);
    } else {
      setValues({
        firstName: "",
        lastName: "",
        email: "",
      });
      setShow(false);
    }
    setValidated(false); // Reset validation state on modal show/hide
    setSubmitted(false); // Reset submission state on modal show/hide
  }, [selectedUser, setValues]);

  const handleClose = () => {
    setShow(false);
    resetForm();
    setSelectedUser(null);
    setValidated(false);
    setSubmitted(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const validateFirstName = () => {
    // Only alphabetical characters, max length 100
    return (
      /^[a-zA-Z]+$/.test(values.firstName) && values.firstName.length <= 100
    );
  };

  const validateLastName = () => {
    // Only alphabetical characters, max length 100
    return /^[a-zA-Z]+$/.test(values.lastName) && values.lastName.length <= 100;
  };

  const validateEmail = () => {
    // Basic email format validation
    return /\S+@\S+\.\S+/.test(values.email);
  };

  const handleSubmit = () => {
    const isValid =
      validateFirstName() && validateLastName() && validateEmail();
    setValidated(true); // Trigger validation feedback
    if (isValid) {
      if (selectedUser) {
        editUser(selectedUser._id, values);
      } else {
        addUser(values);
      }
      handleClose(); // Close modal on successful submission
    }
    setSubmitted(true); // Mark form as submitted
  };

  return (
    <>
      <Button variant="outline-primary" onClick={handleShow}>
        {selectedUser ? "Edit User" : "Add User"}
      </Button>

      <Modal show={show} onHide={handleClose} size="md">
        <Modal.Header closeButton>
          <Modal.Title>{selectedUser ? "Edit User" : "Add User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated}>
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
                  isInvalid={!validateFirstName() && submitted}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid first name (alphabets only, max 100
                  characters).
                </Form.Control.Feedback>
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
                  isInvalid={!validateLastName() && submitted}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid last name (alphabets only, max 100
                  characters).
                </Form.Control.Feedback>
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
                  isInvalid={!validateEmail() && submitted}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid email address.
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Button
              id="addUser"
              variant="outline-primary"
              className="action-btn"
              type="button" // Use type="button" to prevent form submission on click
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
