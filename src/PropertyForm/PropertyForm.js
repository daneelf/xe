import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import validate from "./validations";

const PropertyForm = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const lsFormData = JSON.parse(localStorage.getItem("formData"));

    if (localStorage.getItem("formData")) {
      setFormData({
        title: lsFormData.title,
        type: lsFormData.type,
        area: lsFormData.area,
        extraDescription: lsFormData.extraDescription,
        price: lsFormData.price,
      });
    } else {
      setFormData({
        title: "",
        type: "",
        area: "",
        extraDescription: "",
        price: "",
      });
    }
  }, []);

  const setField = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    }

    localStorage.setItem("formData", JSON.stringify(formData));
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <h1>New property classified</h1>
      <Form
        style={{ maxWidth: "500px", width: "100%" }}
        className={"p-2"}
        onSubmit={handleFormSubmit}
      >
        <Row className="align-items-center">
          <Col xs={12} md={12} lg={12}>
            <Form.Group className="mt-2">
              <Form.Label>Title</Form.Label>
              <Form.Control
                onChange={(e) => setField("title", e.target.value)}
                isInvalid={Boolean(errors.title)}
                type="text"
                placeholder="Classified title up to 155 characters"
                value={formData.title}
              />

              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Type</Form.Label>
              <Form.Control
                onChange={(e) => setField("type", e.target.value)}
                isInvalid={Boolean(errors.type)}
                as="select"
                className="browser-default"
                value={formData.type}
              >
                <option value="">Select type:</option>
                <option value="rent">Rent</option>
                <option value="buy">Buy</option>
                <option value="exchange">Exchange</option>
                <option value="donation">Donation</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.type}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Area</Form.Label>
              <Form.Control
                onChange={(e) => setField("area", e.target.value)}
                isInvalid={Boolean(errors.area)}
                type="text"
                placeholder="Type in the property's area"
                value={formData.area}
              />
              <Form.Control.Feedback type="invalid">
                {errors.area}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Price</Form.Label>
              <Form.Control
                onChange={(e) => setField("price", e.target.value)}
                isInvalid={Boolean(errors.price)}
                type="number"
                placeholder="Amount"
                value={formData.price}
              />
              <Form.Control.Feedback type="invalid">
                {errors.price}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Extra description</Form.Label>
              <Form.Control
                onChange={(e) => setField("extraDescription", e.target.value)}
                as="textarea"
                placeholder="Type here"
                value={formData.extraDescription}
              />
            </Form.Group>
            <Button
              variant="outline-primary"
              type="submit"
              className="mt-3 w-100"
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
