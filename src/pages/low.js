import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../components/Header";
import Pag from "../components/Pagination";
import ProductCard from "../components/ProductCard";
import Filter from "../components/Filter";

// markup
const Low = ({ data }) => {
  const products = data.allContentfulProduit.edges;
  const [currentProduct, setCurrentProduct] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [prevDis, setPrevDis] = useState(true);
  const [nextDis, setNextDis] = useState(false);
  let productsPerPage = 4;
  const [lastProduct, setLastProduct] = useState(productsPerPage);
  let limit = products.length;
  console.log(currentProduct);
  console.log(lastProduct);

  useEffect(() => {
    if (lastProduct >= limit) {
      setNextDis(true);
    } else if (lastProduct < limit) {
      setNextDis(false);
    }
    if (currentProduct === 0) {
      setPrevDis(true);
    } else if (currentProduct >= 0) {
      setPrevDis(false);
    }
  }, [currentPage]);

  return (
    <>
      <Header />
      <Container style={{ marginTop: "30px" }}>
        <Filter defaultprix="/low" />
        <Row>
          {products.slice(currentProduct, lastProduct).map((product, i) => {
            return <ProductCard key={i} product={product} />;
          })}
        </Row>
        <Row>
          <Pag
            limit={limit}
            current={currentProduct}
            last={lastProduct}
            productsPerPage={productsPerPage}
            setNextDis={setNextDis}
            setPrevDis={setPrevDis}
            setCurrentProduct={setCurrentProduct}
            setLastProduct={setLastProduct}
            prevDis={prevDis}
            nextDis={nextDis}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Row>
      </Container>
    </>
  );
};

export default Low;

export const pageQuery = graphql`
  query LowQuery {
    allContentfulProduit(
      filter: { enStock: { eq: true }, prix: { lte: 1000000 } }
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
