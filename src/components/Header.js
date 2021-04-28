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
          <Navbar.Text>
            <a
              href="https://www.facebook.com/Ettissalet-othmani-100166775408743"
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              facebook
            </a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};
export default Header;
