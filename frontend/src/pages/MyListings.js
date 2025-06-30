import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserMd,
  faClinicMedical,
  faHospital,
} from "@fortawesome/free-solid-svg-icons";
import "./MyListings.css";

const MyListings = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);

  const cards = [
    { title: "Doctors", icon: faUserMd, path: "/doctors/add" },
    { title: "Clinics", icon: faClinicMedical, path: "/clinics/add" },
    { title: "Hospitals", icon: faHospital, path: "/hospitals/add" },
  ];

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/user/listings", {
          withCredentials: true,
        });
        setListings(res.data);
      } catch (err) {
        console.error("Error fetching listings:", err);
      }
    };

    fetchListings();
  }, []);

  const getImage = (item) =>
    item.clinicImage || item.doctorImage || item.hospitalImage || "default.png";

  return (
    <>
      <Navbar />
      <Container className="my-5">
        <h2 className="text-center text-primary mb-4">My Listings</h2>

        {/* Add Listing Cards */}
        <Row className="justify-content-center custom-row mb-5">
          {cards.map((card, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3} className="custom-col mb-4">
              <Card
                className="text-center shadow-sm h-100 card-hover"
                onClick={() => navigate(card.path)}
              >
                <Card.Body className="d-flex flex-column align-items-center justify-content-center py-4">
                  <div className="icon-circle mb-3">
                    <FontAwesomeIcon icon={card.icon} className="icon" />
                  </div>
                  <Card.Title className="mb-3 card-title">
                    {card.title}
                  </Card.Title>
                  <Button variant="outline-primary" size="sm">
                    Add
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* User Listings Section */}
        <h4 className="text-primary mb-3">Your Created Listings</h4>
        <Row>
          {listings.length === 0 ? (
            <p>No listings found.</p>
          ) : (
            listings.map((item) => (
              <Col
                key={`${item.listingType}-${item.id}`}
                xs={12}
                sm={6}
                md={3}
                className="mb-4"
              >
                <Card className="shadow-sm h-100">
                  <Card.Img
                    variant="top"
                    src={`http://localhost:5000/uploads/${getImage(item)}`}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                      <strong>Type:</strong> {item.type} <br />
                      <strong>Area:</strong> {item.area} <br />
                      <strong>Category:</strong> {item.category} <br />
                      <strong>Mobile:</strong> {item.mobile} <br />
                      <small className="text-muted">
                        <strong>Listing:</strong> {item.listingType}
                      </small>
                    </Card.Text>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => navigate(`/edit/${item.listingType}/${item.id}`)}
                      className="me-2"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => console.log("Delete logic here")}
                    >
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </>
  );
};

export default MyListings;
