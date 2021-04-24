import React, { useState, useRef } from "react";
import axios from "axios";
import { Row, Col, Button } from "react-bootstrap";
import Remove from "../images/remove.png";
// import { useForm } from "@formspree/react";

const Acheter = ({
  produit,
  popupClass,
  setPopupClass,
  setSuccessPopupClass,
}) => {
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
  // const filterEmail = (email) => {

  // }
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    setServerState({ submitting: true });

    form.email.value = form.email.value.replace(/\s/g, "");
    // console.log(form.email.value);
    // console.log(form);
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
              <input type="text" className="form-control" name="email" />
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
