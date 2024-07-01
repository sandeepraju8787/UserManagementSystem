import { Container, Row, Col } from "react-bootstrap";
import UserFormModal from "./components/UserFormModal.jsx";
import UserTable from "./components/UserTable.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import AppNavbar from "./components/Navbar.jsx";

function App() {
  return (
    <UserProvider>
      <AppNavbar />
      <Container className="mt-6">
        <Row>
          <Col className="text-center">
            <h4 id="title" className="mt-2">
              Users
            </h4>
            <UserTable />
          </Col>
        </Row>
      </Container>
    </UserProvider>
  );
}

export default App;
