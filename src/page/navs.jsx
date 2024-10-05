import { Navbar, Container } from "react-bootstrap";

export function PageNav() {
  return (
    <Navbar data-bs-theme="dark" bg="dark">
      <Container>
        <Navbar.Brand>Employees</Navbar.Brand>
      </Container>
    </Navbar>
  );
}
