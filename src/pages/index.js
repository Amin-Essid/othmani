import * as React from "react";
import { graphql } from "gatsby";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../components/Header";
import Filter from "../components/Filter";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

// markup
const IndexPage = ({ data }) => {
  const products = data.allContentfulProduit.edges;
  console.log(products);
  return (
    <>
      <Header />
      <Container style={{ marginTop: "30px" }}>
        <Filter />

        <Row>
          {products.map((product, i) => {
            return <ProductCard key={i} product={product} />;
          })}
        </Row>
      </Container>
      <Footer />
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
