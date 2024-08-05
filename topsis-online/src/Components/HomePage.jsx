import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import '../Styles/HomePage.css';

function Home() {
  return (
    <div className="animated-background d-flex align-items-center justify-content-center">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <div className="form-container text-center mb-4 p-5 bg-white rounded-lg shadow-lg animate__animated animate__zoomIn">
              <h1 className="display-4 text-chestnut mb-4 animate__animated animate__fadeInDown">TOPSIS SOFTWARE</h1>
              <Form>
                <Form.Group controlId="projectTitle">
                  <Form.Control
                    type="text"
                    placeholder="Write your Project Title"
                    className="p-3 border rounded-lg focus-outline-none animate__animated animate__fadeInUp"
                  />
                </Form.Group>
                <Link to="/next">
                  <Button
                    variant="chestnut"
                    className="mt-3 w-100 py-2 animate__animated animate__pulse animate__infinite"
                  >
                    Next
                  </Button>
                </Link>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
