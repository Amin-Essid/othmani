import * as React from "react";
import { graphql } from "gatsby";
import { Container, Col, Row, Button } from "react-bootstrap";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
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
  let prix = numberWithCommas(product.node.prix);
  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col>
            <img href={data.prod.image.file.url} />
          </Col>
          <Col>
            <h1>{data.prod.produit}</h1>
            <h2>{prix}</h2>
            {data.prod.enStock ? <p>en stock</p> : <p>epuisé</p>}
            {data.prod.livraison ? <p>livraison express</p> : null}
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
