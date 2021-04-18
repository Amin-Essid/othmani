import * as React from "react";
import { graphql } from "gatsby";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";

// markup
const IndexPage = ({ data }) => {
  const products = data.allContentfulProduit.edges;
  console.log(products);
  return (
    <>
      <Header />
      <Container style={{ marginTop: "30px" }}>
        <Row>
          {products.map((product) => {
            return <ProductCard product={product} />;
          })}
        </Row>
      </Container>
    </>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query HomeQuery {
    allContentfulProduit(
      filter: { featured: { eq: true }, enStock: { eq: true } }
    ) {
      edges {
        node {
          lien
          brand
          contentful_id
          createdAt
          enStock
          image {
            file {
              url
            }
          }
          prix
          produit
          description {
            raw
          }
        }
      }
    }
  }
`;
