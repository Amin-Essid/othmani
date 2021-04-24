import React, { useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { Row, Col, Button } from "react-bootstrap";
import Remove from "../images/remove.png";
import * as Yup from "yup";
// import { useForm } from "@formspree/react";

const formSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  message: Yup.string().required("Required"),
});

const Acheter = ({
  produit,
  popupClass,
  setPopupClass,
  setSuccessPopupClass,
}) => {
  const formEl = useRef(null);
  const [serverState, setServerState] = useState();
  const handleServerResponse = (ok, msg) => {
    setServerState({ ok, msg });
  };
  const handleOnSubmit = (values, actions) => {
    axios({
      method: "POST",
      url: "http://formspree.io/YOUR_FORM_ID",
      data: values,
    })
      .then((response) => {
        actions.setSubmitting(false);
        actions.resetForm();
        handleServerResponse(true, "Thanks!");
      })
      .catch((error) => {
        actions.setSubmitting(false);
        handleServerResponse(false, error.response.data.error);
      });
  };
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
          {/* <Formik
            initialValues={{
              produit,
              nom: "",
              phone: "",
              adresse: "",
              email: "",
            }}
            onSubmit={(values, actions) => {
              console.log(process.env.GATSBY_FORMSPREE);
              let data = JSON.stringify({
                produit: values.produit,
                nom: values.nom,
                phone: values.phone,
                adresse: values.adresse,
                email: values.email,
              });
              let d = actions.Form;
              console.log(d);
              console.log(formEl.current);
              let axiosConfig = {
                headers: {
                  "Content-Type": "application/json;charset=UTF-8",
                  "Access-Control-Allow-Origin": "*",
                },
              };
              axios({
                method: "POST",
                url: process.env.GATSBY_FORMSPREE,
                data: values,
                axiosConfig,
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
              <Form ref={formEl}>
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
          </Formik> */}

          <Formik
            initialValues={{ email: "", message: "" }}
            onSubmit={handleOnSubmit}
            validationSchema={formSchema}
          >
            {({ isSubmitting }) => (
              <Form id="fs-frm" noValidate>
                <label htmlFor="email">Email:</label>
                <Field id="email" type="email" name="email" />
                <ErrorMessage name="email" className="errorMsg" component="p" />
                <label htmlFor="message">Message:</label>
                <Field id="message" name="message" component="textarea" />
                <ErrorMessage
                  name="message"
                  className="errorMsg"
                  component="p"
                />
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
                {serverState && (
                  <p className={!serverState.ok ? "errorMsg" : ""}>
                    {serverState.msg}
                  </p>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Acheter;
