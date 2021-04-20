import * as React from "react";
import { Form, Row, Col, Button, Card } from "react-bootstrap";

import { Link, navigate } from "gatsby";

// markup
const Filter = ({
  toPage = "voir tous les produits",
  toPageLink = "/all",
  defaultprix = "tous",
  defaultFabricant = "tous",
}) => {
  return (
    <Card style={{ marginBottom: "10px" }}>
      <Row>
        <Col md={4} align="center">
          <Form.Group
            style={{
              width: "200px",
              display: "inline-block",
              marginTop: "12px",
            }}
          >
            <Form.Label>Prix</Form.Label>
            <Form.Control
              as="select"
              size="lg"
              defaultValue={defaultprix}
              onChange={(event) => {
                console.log(event.target.value);
                navigate(event.target.value);
              }}
            >
              <option value="/all">tous</option>
              <option value="/">{"<1000 DN"}</option>
              <option value="/">{"1000 DN - 2000 DN"}</option>
              <option value="/">{"+2000 DN"}</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={4} align="center">
          <Form.Group
            style={{
              width: "200px",
              display: "inline-block",
              marginTop: "12px",
            }}
          >
            <Form.Label>FABRICANT</Form.Label>
            <Form.Control
              as="select"
              size="lg"
              defaultValue={defaultFabricant}
              onChange={(event) => {
                console.log(event.target.value);
                navigate(event.target.value);
              }}
            >
              <option value="/all">tous</option>
              <option value="/">samsung</option>
              <option value="/">huawei</option>
              <option value="/">xiaomi</option>
              <option value="/">oppo</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={4} align="center">
          <Link to={toPageLink}>
            <Button
              style={{
                width: "200px",
                display: "inline-block",
                marginTop: "45px",
                fontSize: "18px",
                height: "46px",
              }}
            >
              {toPage}
            </Button>
          </Link>
        </Col>
      </Row>
    </Card>
  );
};
export default Filter;
