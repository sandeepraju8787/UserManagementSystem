import { Navbar, Nav, Container } from "react-bootstrap";
import UserFormModal from "./UserFormModal.jsx";
import "../index.css";

const AppNavbar = () => {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="#home" className="mr-auto app-logo">
          SimplyManage.
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link>
            <UserFormModal />
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
