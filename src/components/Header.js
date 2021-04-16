import * as React from "react";
import { Navbar, Container } from "react-bootstrap";

import { Link } from "gatsby";

// markup
const Header = () => {
  return (
    <Container>
      <Navbar bg="primary" variant="dark" expand="md">
        <Navbar.Brand href="/">
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            ETTISSALET OTHMANI
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>facebook</Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};
export default Header;
