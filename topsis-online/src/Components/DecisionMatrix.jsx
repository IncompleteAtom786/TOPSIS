import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Form, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import '../Styles/DecisionMatrix.css';

function DecisionMatrix() {
    const location = useLocation();
    const { alternatives, criteria } = location.state || { alternatives: [], criteria: [] };
    const [experts, setExperts] = useState([{ id: 1, name: 'Expert 1', matrix: {} }]);
    const [selectedExpert, setSelectedExpert] = useState(experts[0].id);

    const addExpert = () => {
        const newExpert = { id: experts.length + 1, name: `Expert ${experts.length + 1}`, matrix: {} };
        setExperts([...experts, newExpert]);
        setSelectedExpert(newExpert.id);
    };

    const removeExpert = (id) => {
        const updatedExperts = experts.filter(expert => expert.id !== id);
        setExperts(updatedExperts);
        if (updatedExperts.length > 0) {
            setSelectedExpert(updatedExperts[0].id);
        } else {
            setSelectedExpert(null);
        }
    };

    const handleMatrixChange = (altIndex, critIndex, value) => {
        const updatedExperts = experts.map(expert => {
            if (expert.id === selectedExpert) {
                const newMatrix = { ...expert.matrix };
                if (!newMatrix[altIndex]) {
                    newMatrix[altIndex] = {};
                }
                newMatrix[altIndex][critIndex] = value;
                return { ...expert, matrix: newMatrix };
            }
            return expert;
        });
        setExperts(updatedExperts);
    };

    const handleExpertChange = (event) => {
        setSelectedExpert(Number(event.target.value));
    };

    const handleSaveClick = () => {
        const dataToSave = {
            alternatives,
            criteria,
            experts
        };

        fetch('http://localhost:3001/saveData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSave)
        })
            .then(response => response.text())
            .then(data => {
                alert(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="animated-background d-flex align-items-center justify-content-center">
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12}>
                        <div className="container text-center mb-4 p-5 bg-white rounded-lg shadow-lg animate__animated animate__zoomIn">
                            <h1 className="display-4 text-chestnut mb-4 animate__animated animate__fadeInDown">Decision Matrix</h1>
                            <div className="mb-4 text-center">
                                <div className="text-lg font-semibold text-chestnut">Topsis Software</div>
                            </div>
                            <div className="expert-controls">
                                <Form.Group controlId="selectedExpert" className="mb-0">
                                    <Form.Control as="select" value={selectedExpert} onChange={handleExpertChange}>
                                        {experts.map(expert => (
                                            <option key={expert.id} value={expert.id}>{expert.name}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                <Button variant="chestnut" onClick={addExpert}>+ Add Expert</Button>
                                <Button variant="danger" onClick={() => removeExpert(selectedExpert)}>Delete Expert</Button>
                                <Button variant="success" onClick={handleSaveClick}>Save Expert</Button>
                            </div>
                            <div>
                                <h2 className="text-sienna">Decision Matrix</h2>
                                {experts.map(expert => (
                                    expert.id === selectedExpert && (
                                        <div key={expert.id}>
                                            <h3>{expert.name}</h3>
                                            <div className="table-container">
                                                <Table striped hover>
                                                    <thead>
                                                        <tr>
                                                            <th></th>
                                                            {criteria.map((crit, index) => (
                                                                <th key={index}>{crit.criterion}</th>
                                                            ))}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {alternatives.map((alt, altIndex) => (
                                                            <tr key={altIndex}>
                                                                <th>{alt}</th>
                                                                {criteria.map((crit, critIndex) => (
                                                                    <td key={critIndex}>
                                                                        <Form.Control
                                                                            type="text"
                                                                            value={expert.matrix[altIndex]?.[critIndex] || ''}
                                                                            onChange={(e) => handleMatrixChange(altIndex, critIndex, e.target.value)}
                                                                        />
                                                                    </td>
                                                                ))}
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>
                            <div className="d-flex justify-content-between mt-6">
                                <Link to="/next">
                                    <Button variant="secondary" className="p-2 bg-gray-500 text-white rounded">Back</Button>
                                </Link>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default DecisionMatrix;
