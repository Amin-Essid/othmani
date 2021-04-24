import React, { useState, useRef } from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { Row, Col, Button } from "react-bootstrap";
import Remove from "../images/remove.png";
import * as Yup from "yup";
// import { useForm } from "@formspree/react";

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
  const formEl = useRef(null);
  const [serverState, setServerState] = useState({
    submitting: false,
    status: null,
  });
  const handleServerResponse = (ok, msg, form) => {
    setServerState({
      submitting: false,
      status: { ok, msg },
    });
    if (ok) {
      form.reset();
    }
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    setServerState({ submitting: true });
    axios({
      method: "post",
      url: process.env.GATSBY_FORMSPREE,
      data: new FormData(form),
    })
      .then((r) => {
        handleServerResponse(true, "Merci!", form);
        setPopupClass("overlay_hidden");
        setSuccessPopupClass("overlay");
      })
      .catch((r) => {
        handleServerResponse(false, r.response.data.error, form);
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

          <form onSubmit={handleOnSubmit}>
            <div style={{ display: "none" }} className="form-group">
              <label htmlFor="nom">Produit: </label>
              <input className="form-control" name="nom" value={produit} />
            </div>

            <div className="form-group">
              <label htmlFor="nom">Nom: </label>
              <input className="form-control" name="nom" />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Numero du téléphone: </label>
              <input className="form-control" name="phone" />
            </div>

            <div className="form-group">
              <label htmlFor="adresse">Adresse: </label>
              <input className="form-control" name="adresse" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email: </label>
              <input className="form-control" name="email" />
            </div>

            <Button
              style={{ backgroundColor: "red", fontSize: "24px" }}
              variant="primary"
              type="submit"
            >
              Acheter
            </Button>
            {serverState.status && (
              <p className={!serverState.status.ok ? "errorMsg" : ""}>
                {serverState.status.msg}
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Acheter;
