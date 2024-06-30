import { Container, Row, Col } from "react-bootstrap";
import UserForm from "./components/UserForm.jsx";
import UserTable from "./components/UserTable.jsx";
import { UserProvider } from "./context/UserContext.jsx";

function App() {
  return (
    <UserProvider>
      <Container className="mt-5">
        <Row>
          <Col>
            <h1>Add User</h1>
            <UserForm />
          </Col>
        </Row>
        <Row>
          <Col>
            <h1>User List</h1>
            <UserTable />
          </Col>
        </Row>
      </Container>
    </UserProvider>
  );
}

export default App;
