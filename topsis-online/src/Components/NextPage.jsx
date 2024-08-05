import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Form, Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import '../Styles/NextPage.css';

function NextPage() {
  const [numAlternatives, setNumAlternatives] = useState(5);
  const [numCriteria, setNumCriteria] = useState(4);
  const [alternatives, setAlternatives] = useState([]);
  const [criteria, setCriteria] = useState([]);

  useEffect(() => {
    createAlternativesTable();
    createCriteriaTable();
  }, [numAlternatives, numCriteria]);

  const createAlternativesTable = () => {
    const newAlternatives = Array.from(
      { length: numAlternatives },
      (_, i) => `alternative${i + 1}`
    );
    setAlternatives(newAlternatives);
  };

  const createCriteriaTable = () => {
    const newCriteria = Array.from({ length: numCriteria }, (_, i) => ({
      criterion: `criterion${i + 1}`,
      type: `type${i + 1}`,
      weight: `weight${i + 1}`,
    }));
    setCriteria(newCriteria);
  };

  const handleAlternativeChange = (index, value) => {
    const newAlternatives = [...alternatives];
    newAlternatives[index] = value;
    setAlternatives(newAlternatives);
  };

  const handleCriterionChange = (index, field, value) => {
    const newCriteria = [...criteria];
    newCriteria[index][field] = value;
    setCriteria(newCriteria);
  };

  return (
    <div className="animated-background d-flex align-items-center justify-content-center">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12}>
            <div className="container text-center mb-4 p-5 bg-white rounded-lg shadow-lg animate__animated animate__zoomIn">
              <h1 className="display-4 text-chestnut mb-4 animate__animated animate__fadeInDown">Data Entry</h1>
              <div className="mb-4 text-center">
                <div className="text-lg font-semibold text-chestnut">Topsis Software</div>
              </div>
              <Row>
                <Col md={6} className="mb-4">
                  <div className="shadow-lg p-4 rounded-lg bg-white">
                    <h2 className="text-2xl font-semibold mb-4 text-sienna">Alternatives</h2>
                    <Form.Group controlId="numAlternatives">
                      <Form.Label>Number of alternatives:</Form.Label>
                      <Form.Control
                        type="number"
                        className="mt-2 w-full p-2 border border-gray-300 rounded"
                        value={numAlternatives}
                        onChange={(e) => setNumAlternatives(Number(e.target.value))}
                      />
                    </Form.Group>
                    <Button
                      variant="chestnut"
                      className="mt-3 mb-4 w-full p-2"
                      onClick={createAlternativesTable}
                    >
                      Create table of alternatives
                    </Button>
                    <div className="table-container">
                      <Table striped hover>
                        <thead>
                          <tr>
                            <th>Name</th>
                          </tr>
                        </thead>
                        <tbody>
                          {alternatives.map((alt, index) => (
                            <tr key={index}>
                              <td>
                                <Form.Control
                                  type="text"
                                  className="w-full p-2 border border-gray-300 rounded"
                                  value={alt}
                                  onChange={(e) =>
                                    handleAlternativeChange(index, e.target.value)
                                  }
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </Col>

                <Col md={6} className="mb-4">
                  <div className="shadow-lg p-4 rounded-lg bg-white">
                    <h2 className="text-2xl font-semibold mb-4 text-sienna">Criteria</h2>
                    <Form.Group controlId="numCriteria">
                      <Form.Label>Number of criteria:</Form.Label>
                      <Form.Control
                        type="number"
                        className="mt-2 w-full p-2 border border-gray-300 rounded"
                        value={numCriteria}
                        onChange={(e) => setNumCriteria(Number(e.target.value))}
                      />
                    </Form.Group>
                    <Button
                      variant="chestnut"
                      className="mt-3 mb-4 w-full p-2"
                      onClick={createCriteriaTable}
                    >
                      Create table of criteria
                    </Button>
                    <div className="table-container">
                      <Table striped hover>
                        <thead>
                          <tr>
                            <th>Criterion</th>
                            <th>Type</th>
                            <th>Weight</th>
                          </tr>
                        </thead>
                        <tbody>
                          {criteria.map((crit, index) => (
                            <tr key={index}>
                              <td>
                                <Form.Control
                                  type="text"
                                  className="w-full p-2 border border-gray-300 rounded"
                                  value={crit.criterion}
                                  onChange={(e) =>
                                    handleCriterionChange(index, "criterion", e.target.value)
                                  }
                                />
                              </td>
                              <td>
                                <Form.Control
                                  type="text"
                                  className="w-full p-2 border border-gray-300 rounded"
                                  value={crit.type}
                                  onChange={(e) =>
                                    handleCriterionChange(index, "type", e.target.value)
                                  }
                                />
                              </td>
                              <td>
                                <Form.Control
                                  type="text"
                                  className="w-full p-2 border border-gray-300 rounded"
                                  value={crit.weight}
                                  onChange={(e) =>
                                    handleCriterionChange(index, "weight", e.target.value)
                                  }
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </Col>
              </Row>
              <div className="d-flex justify-content-between mt-6">
                <Link to="/">
                  <Button variant="secondary" className="p-2 bg-gray-500 text-white rounded">Back</Button>
                </Link>
                <Link to="/decision-matrix" state={{ alternatives, criteria }}>
                  <Button variant="chestnut" className="p-2">Next</Button>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default NextPage;
