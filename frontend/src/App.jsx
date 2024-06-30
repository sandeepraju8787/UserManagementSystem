import { Container, Row, Col } from "react-bootstrap";
import UserFormModal from "./components/UserFormModal.jsx";
import UserTable from "./components/UserTable.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import AppNavbar from "./components/Navbar.jsx";

function App() {
  return (
    <UserProvider>
      <AppNavbar />
      <Container className="mt-5">
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
