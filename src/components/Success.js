import React from "react";
import { Row, Col } from "react-bootstrap";
import Remove from "../images/remove.png";

const Success = ({ produit, popupClass, setPopupClass }) => {
  return (
    <>
      <div className={popupClass}>
        <div className="popup">
          <Row>
            <Col xs={10} md={8}>
              MERCI POUR VOTRE CONFIENCE
            </Col>
            <Col xs={2} md={{ span: 2, offset: 2 }}>
              <img
                style={{ width: "30px", cursor: "pointer" }}
                onClick={() => setPopupClass("overlay_hidden")}
                src={Remove}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={10}>
              La livraison de<b>{` ${produit} `}</b>sera effectuée en 48H
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Success;
