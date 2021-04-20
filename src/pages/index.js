import * as React from "react";
import { graphql } from "gatsby";
import { Container, Row, Button } from "react-bootstrap";
import Header from "../components/Header";
import Filter from "../components/Filter";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { Link } from "gatsby";

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
        <Row>
          <Link style={{ margin: "0 auto 20px auto" }} to="/all">
            <Button
              style={{
                width: "200px",
                display: "inline-block",
                marginTop: "45px",
                fontSize: "18px",
                height: "46px",
              }}
            >
              voir tous les produits
            </Button>
          </Link>
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
