import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMd, faClinicMedical, faHospital } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import "./Home.css";
const Home = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Doctors",
      icon: faUserMd,
      path: "/doctors/list",
    },
    {
      title: "Clinics",
      icon: faClinicMedical,
      path: "/clinics/list",
    },
    {
      title: "Hospitals",
      icon: faHospital,
      path: "/hospitals/list",
    },
  ];

  return (
    <>
      <Navbar />
      <Container className="mt-5">
        <div className="text-center mb-5">
          <h1 className="text-primary fw-bold">Welcome to Doctor Directory</h1>
          <p className="lead">Search and list doctors, clinics, and hospitals near you.</p>
          <Link to="/clinics/add" className="btn btn-success mt-2">
            ➕ Add Clinic
          </Link>
        </div>

        <Row className="justify-content-center flex-wrap text-center">
          {cards.map((card, index) => (
            <Col
              key={index}
              xs={4}  // 3 columns in one row on mobile (12/4 = 3 cards)
              sm={4}
              md={3}
              lg={2}
              className="mb-3"
            >
              <Card
                className="shadow-sm h-100 card-hover"
                onClick={() => navigate(card.path)}
                style={{ cursor: 'pointer' }}
              >
                <Card.Body className="d-flex flex-column align-items-center justify-content-center py-4">
                  <div className="icon-circle mb-3">
                    <FontAwesomeIcon icon={card.icon} size="2x" className="text-primary" />
                  </div>
                  <Card.Title className="mb-2" style={{ fontSize: '1rem' }}>{card.title}</Card.Title>
                  <Button variant="outline-primary" size="sm">
                    View
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

export default Home;
