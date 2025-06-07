import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserMd,
  faClinicMedical,
  faHospital,
} from "@fortawesome/free-solid-svg-icons";
import "./MyListings.css"; // Link to your CSS

const MyListings = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Doctors",
      icon: faUserMd,
      path: "/doctors",
    },
    {
      title: "Clinics",
      icon: faClinicMedical,
      path: "/clinics/add",
    },
    {
      title: "Hospitals",
      icon: faHospital,
      path: "/hospitals",
    },
  ];

  return (
    <>
      <Navbar />
      <Container className="my-5">
        <h2 className="text-center text-primary mb-4">My Listings</h2>
        <Row className="justify-content-center custom-row">
          {cards.map((card, index) => (
            <Col key={index} xs={3} className="custom-col">
              <Card
                className="text-center shadow-sm h-100 card-hover"
                onClick={() => navigate(card.path)}
              >
                <Card.Body className="d-flex flex-column align-items-center justify-content-center py-4">
                  <div className="icon-circle mb-3">
                    <FontAwesomeIcon
                      icon={card.icon}
                      className="icon"
                    />
                  </div>
                  <Card.Title className="mb-3 card-title">{card.title}</Card.Title>
                  <Button variant="outline-primary" size="sm">
                    Add
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default MyListings;
