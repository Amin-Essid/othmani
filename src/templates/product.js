import * as React from "react";
import { graphql } from "gatsby";
import { Container, Col, Row, Button } from "react-bootstrap";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";

const Bold = ({ children }) => <span className="bold">{children}</span>;
const Text = ({ children }) => <p className="align-center">{children}</p>;

const options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      return (
        <>
          <h2>Embedded Asset</h2>
          <pre>
            <code>{JSON.stringify(node, null, 2)}</code>
          </pre>
        </>
      );
    },
  },
};

function numberWithCommas(x) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

// markup
const Product = ({ data }) => {
  let prix = numberWithCommas(data.prod.prix);
  return (
    <>
      <Header />
      <Container>
        <Row style={{ marginTop: "40px" }}>
          <Col md={4}>
            <img style={{ width: "468px" }} src={data.prod.image.file.url} />
          </Col>
          <Col style={{ marginTop: "20px" }} md={{ span: 5, offset: 1 }}>
            <h1>{data.prod.produit}</h1>
            <br />
            <h2 style={{ color: "red" }}>{`${prix} DT`}</h2>
            <br />
            <div>
              {data.prod.enStock ? (
                <span style={{ color: "green", fontWeight: "bold" }}>
                  &#10003; en stock
                </span>
              ) : (
                <span>&#10003; epuisé</span>
              )}
              {data.prod.livraison ? (
                <span style={{ fontWeight: "bold", marginLeft: "20px" }}>
                  &#10003; livraison express
                </span>
              ) : null}
            </div>
            <br />
            <p>
              {data.prod.description &&
                renderRichText(data.prod.description, options)}
            </p>
            <br />
            <Button
              style={{ backgroundColor: "red", fontSize: "24px" }}
              variant="primary"
            >
              Acheter
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Product;

// <Card key={product.node.contentful_id} style={{ width: "18rem" }}>
//   <Card.Img variant="top" src={product.node.image.file.url} />
//   <Card.Body>
//     <Card.Title>{product.node.produit}</Card.Title>
//     <Card.Text>
//       {product.node.description &&
//         renderRichText(product.node.description, options)}
//     </Card.Text>
//     <Card.Text>{`${prix} DT`}</Card.Text>
//     <Button variant="primary">Acheter</Button>
//   </Card.Body>
// </Card>

export const query = graphql`
  query GetSinglePost($slug: String) {
    prod: contentfulProduit(lien: { eq: $slug }) {
      brand
      livraison
      contentful_id
      createdAt
      enStock
      id
      prix
      produit
      description {
        raw
      }
      image {
        file {
          url
        }
      }
    }
  }
`;
