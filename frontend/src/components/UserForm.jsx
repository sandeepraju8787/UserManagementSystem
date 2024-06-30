import { Form, Button, Row, Col } from "react-bootstrap";
import { useForm } from "../hooks/useForm"; // Adjust the path as needed
import { UserContext } from "../context/UserContext";

const UserForm = () => {
  const { values, handleChange, resetForm } = useForm({
    // Initial form values
    name: "",
    email: "",
    // Add more fields as needed
  });

  // Example of handling form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission, e.g., send data to API, update context, etc.
    console.log("Form submitted:", values);
    resetForm(); // Reset form after submission
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group as={Row} className="mb-3" controlId="formName">
        <Form.Label column sm="2">
          Name
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formEmail">
        <Form.Label column sm="2">
          Email
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default UserForm;
