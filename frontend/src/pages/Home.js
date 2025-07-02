import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Placeholder } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMd, faClinicMedical, faHospital } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Navbar from '../components/Navbar';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const API = process.env.REACT_APP_API_BASE;

  const cards = [
    { title: "Doctors", icon: faUserMd, path: "/doctors/list" },
    { title: "Clinics", icon: faClinicMedical, path: "/clinics/list" },
    { title: "Hospitals", icon: faHospital, path: "/hospitals/list" },
  ];

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const [doctorsRes, clinicsRes, hospitalsRes] = await Promise.all([
          axios.get(`${API}/api/doctors/latest`),
          axios.get(`${API}/api/clinics/latest`),
          axios.get(`${API}/api/hospitals/latest`),
        ]);

        const combined = [
          ...doctorsRes.data.map(item => ({ ...item, type: 'doctor' })),
          ...clinicsRes.data.map(item => ({ ...item, type: 'clinic' })),
          ...hospitalsRes.data.map(item => ({ ...item, type: 'hospital' })),
        ];
        

        const shuffled = combined.sort(() => 0.5 - Math.random()).slice(0, 12);
        setListings(shuffled);
      } catch (error) {
        console.error('Error fetching latest listings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [API]);

  return (
    <>
      <Navbar />
      <Container className="mt-5">
        <div className="text-center mb-5">
          <h1 className="text-primary fw-bold">Welcome to Doctor Directory</h1>
          <p className="lead">Search and list doctors, clinics, and hospitals near you.</p>
          <Link to="/clinics/add" className="btn btn-success mt-2">➕ Add Clinic</Link>
        </div>

        <Row className="justify-content-center flex-wrap text-center mb-5">
          {cards.map((card, index) => (
            <Col key={index} xs={4} sm={4} md={3} lg={2} className="mb-3">
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
                  <Button variant="outline-primary" size="sm">View</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="text-center mb-3">
          <h4 className="text-dark">Latest Listings</h4>
        </div>

        <Container className="col-10">
          <Row className="g-4">
            {loading
              ? Array.from({ length: 8 }).map((_, idx) => (
                <Col key={idx} xs={12} sm={6} md={3}>
                  <Card className="h-100 shadow-sm">
                    <Placeholder as={Card.Img} animation="wave" style={{ height: '180px' }} />
                    <Card.Body>
                      <Placeholder as={Card.Title} animation="wave" xs={6} />
                      <Placeholder as={Card.Text} animation="wave" xs={4} />
                      <Placeholder.Button variant="primary" xs={6} />
                    </Card.Body>
                  </Card>
                </Col>
              ))
              : listings.map((item, idx) => (
                <Col key={idx} xs={12} sm={6} md={3}>
                  <Card className="h-100 shadow-sm listing-card">
                    <Card.Img
                      variant="top"
                      src={item.image ? `${API}/uploads/${item.image}` : 'https://via.placeholder.com/300x180.png?text=No+Image'}
                      style={{ height: '180px', objectFit: 'cover' }}
                    />
                    <Card.Body>
                      <Card.Title className="fw-semibold" style={{ fontSize: '1rem' }}>
                        {item.name}
                      </Card.Title>
                      <Card.Text className="text-muted" style={{ fontSize: '0.85rem' }}>
                        {item.category || item.type}
                      </Card.Text>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => navigate(`/${item.type}s/${item.slug}`)}
                      >
                        View Details
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default Home;
