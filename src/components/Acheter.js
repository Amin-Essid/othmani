import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { Row, Col, Button } from "react-bootstrap";
import Remove from "../images/remove.png";
import * as Yup from "yup";
// import { useForm } from "@formspree/react";
// import FormData from "formdata-polyfill";

const formSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  message: Yup.string().required("Required"),
  produit: Yup.string().required("Required"),
  nom: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
  adresse: Yup.string().required("Required"),
});

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
              email: "",
            }}
            onSubmit={(values, actions) => {
              console.log(process.env.GATSBY_FORMSPREE);
              axios({
                method: "POST",
                url: process.env.GATSBY_FORMSPREE,
                data: {
                  produit: values.produit,
                  nom: values.nom,
                  phone: values.phone,
                  adresse: values.adresse,
                  email: values.email,
                },
              })
                .then(function (response) {
                  actions.setSubmitting(false);
                  console.log(response);
                  console.log(values);
                  setPopupClass("overlay_hidden");
                  setSuccessPopupClass("overlay");
                })
                .catch(function (error) {
                  actions.setSubmitting(false);
                  console.log(error);
                });
              console.log({
                produit: values.produit,
                nom: values.nom,
                phone: values.phone,
                adresse: values.adresse,
                email: values.email,
              });
              setPopupClass("overlay_hidden");
              setSuccessPopupClass("overlay");

              // var fd = new FormData({
              //   produit: values.produit,
              //   nom: values.nom,
              //   phone: values.phone,
              //   adresse: values.adresse,
              //   email: values.email,
              // });
              // handleSubmit(fd);
            }}
            // validationSchema={formSchema}
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
                <div className="form-group">
                  <label htmlFor="email">Email: </label>
                  <Field className="form-control" name="email" />
                </div>

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
