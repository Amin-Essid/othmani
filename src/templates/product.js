import * as React from "react";
import { graphql } from "gatsby";
import { Container, Col, Row, Button } from "react-bootstrap";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import Header from "../components/Header";
import { useState } from "react";
import Acheter from "../components/Acheter";
import Success from "../components/Success";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

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
  const [popupClass, setPopupClass] = useState("overlay_hidden");
  const [successPopupClass, setSuccessPopupClass] = useState("overlay_hidden");
  return (
    <>
      <Header />
      <Container style={{ marginBottom: "30px" }}>
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
              onClick={() => {
                setPopupClass("overlay");
              }}
            >
              Acheter
            </Button>
          </Col>
        </Row>
      </Container>
      <Footer />
      <Acheter
        produit={data.prod.produit}
        popupClass={popupClass}
        setPopupClass={setPopupClass}
        setSuccessPopupClass={setSuccessPopupClass}
      />
      <Success
        produit={data.prod.produit}
        popupClass={successPopupClass}
        setPopupClass={setSuccessPopupClass}
      />
    </>
  );
};
export default Product;

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
