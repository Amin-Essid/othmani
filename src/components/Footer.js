import * as React from "react";
import { Navbar, Container, Row, Col } from "react-bootstrap";
import foot from "../images/payment.png";

import { Link } from "gatsby";

const Footer = () => {
  return (
    <Container>
      <Navbar bg="primary" variant="dark" expand="md">
        <Row style={{ color: "white", margin: "auto" }}>
          <img src={foot} />
        </Row>
      </Navbar>
    </Container>
  );
};
export default Footer;
