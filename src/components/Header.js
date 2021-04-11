import * as React from "react";
import { Navbar, Container } from "react-bootstrap";

// markup
const Header = () => {
  return (
    <Container>
      <Navbar bg="primary" variant="dark" expand="md">
        <Navbar.Brand href="/">ETTISSALET OTHMANI</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>facebook</Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};
export default Header;
