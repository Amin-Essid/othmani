import React from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { Row, Col, Button } from "react-bootstrap";
import Remove from "../images/remove.png";

const Acheter = ({
  produit,
  popupClass,
  setPopupClass,
  setSuccessPopupClass,
}) => {
  return (
    <>
      <div className={popupClass}>
        <div className="popup">
          <Row>
            <Col xs={10} md={8}>
              La livraison de<b>{` ${produit} `}</b>sera effectuée en 48H
            </Col>
            <Col xs={2} md={{ span: 2, offset: 2 }}>
              <img
                style={{ width: "30px", cursor: "pointer" }}
                onClick={() => {
                  setPopupClass("overlay_hidden");
                }}
                src={Remove}
              />
            </Col>
          </Row>
          <br />
          <Formik
            initialValues={{
              produit,
              nom: "",
              phone: "",
              adresse: "",
            }}
            onSubmit={(values) => {
              console.log(process.env.GATSBY_FORMSPREE);
              console.log({
                produit: values.produit,
                nom: values.nom,
                phone: values.phone,
                adresse: values.adresse,
              });
              setPopupClass("overlay_hidden");
              setSuccessPopupClass("overlay");
              axios
                .post(process.env.GATSBY_FORMSPREE, {
                  produit: values.produit,
                  nom: values.nom,
                  phone: values.phone,
                  adresse: values.adresse,
                  email: values.email,
                })
                .then(function (response) {
                  console.log(response);
                  console.log(values);
                  setPopupClass("overlay_hidden");
                  setSuccessPopupClass("overlay");
                })
                .catch(function (error) {
                  console.log(error);
                });
            }}
          >
            {() => (
              <Form>
                <div className="form-group">
                  <label htmlFor="nom">Nom: </label>
                  <Field className="form-control" name="nom" />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Numero du téléphone: </label>
                  <Field className="form-control" name="phone" />
                </div>

                <div className="form-group">
                  <label htmlFor="adresse">Adresse: </label>
                  <Field className="form-control" name="adresse" />
                </div>
                {/* <label htmlFor="email">Email: </label>
                <Field name="email" /> */}

                <Button
                  style={{ backgroundColor: "red", fontSize: "24px" }}
                  variant="primary"
                  type="submit"
                >
                  Acheter
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Acheter;
