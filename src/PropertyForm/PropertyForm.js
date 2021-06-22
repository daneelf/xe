import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const PropertyForm = () => {
  return (
    <div className="d-flex flex-column align-items-center">
      <h1>New property classified</h1>
      <Form style={{ maxWidth: "500px", width:"100%" }} className={"p-2"}>
        <Row className="align-items-center">
          <Col xs={12} md={12} lg={12}>
            <Form.Group className="mt-2">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Classified title up to 155 characters"
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Type</Form.Label>
              <Form.Control as="select" className="browser-default">
                <option value="">Select type:</option>
                <option value="rent">Rent</option>
                <option value="buy">Buy</option>
                <option value="exchange">Exchange</option>
                <option value="donation">Donation</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Area</Form.Label>
              <Form.Control
                type="text"
                placeholder="Type in the property's area"
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" placeholder="Amount" />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Extra description</Form.Label>
              <Form.Control as="textarea" placeholder="Type here" />
            </Form.Group>
            <Button
              variant="outline-primary"
              type="submit"
              className="mt-2 w-100"
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

PropertyForm.propTypes = {};

export default PropertyForm;
