import * as React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "gatsby";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

// markup
const ProductCard = ({ product }) => {
  let prix = numberWithCommas(product.node.prix);
  return (
    <Card
      key={product.node.contentful_id}
      style={{
        width: "18rem",
        height: "490px ",
        margin: "10px",
      }}
    >
      <Link
        to={`/${product.node.lien}`}
        style={{
          cursor: "pointer",
          textDecoration: "none",
          color: "black ",
        }}
      >
        <Card.Img variant="top" src={product.node.image.file.url} />
        <Card.Body>
          <Card.Title style={{ color: "black" }}>
            {product.node.produit}
          </Card.Title>
          {/* <Card.Text>
      {product.node.description &&
        renderRichText(product.node.description, options)}
    </Card.Text> */}
          <Card.Text style={{ color: "red" }}>{`${prix} DT`}</Card.Text>
          <Button variant="primary">Acheter</Button>
        </Card.Body>
      </Link>
    </Card>
  );
};
export default ProductCard;
