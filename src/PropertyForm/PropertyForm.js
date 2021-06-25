import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import validate from "./validations";
import Autosuggest from "react-autosuggest";
import styles from "./PropertyForm.module.css";
import axios from "axios";
import cs from "classnames";
import Alert from "react-bootstrap/Alert";

const PropertyForm = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [query, setQuery] = useState("");
  const [succesMessage, showSuccessMessage] = useState(false);

  useEffect(() => {
    const lsFormData = JSON.parse(localStorage.getItem("formData"));
    if (Boolean(lsFormData)) {
      setFormData({
        title: lsFormData.title,
        type: lsFormData.type,
        area: lsFormData.area?.text,
        extraDescription: lsFormData.extraDescription,
        price: lsFormData.price,
      });
      setQuery(lsFormData.area?.mainText || "");
    } else {
      setFormData({
        title: "",
        type: "",
        area: {},
        extraDescription: "",
        price: "",
      });
    }
  }, []);

  const setField = (field, value) => {
    if (field === "area") {
      setFormData({
        ...formData,
        area: {
          placeId: value.placeId,
          mainText: value.mainText,
        },
      });
    } else {
      setFormData({
        ...formData,
        [field]: value,
      });
    }

    localStorage.setItem("formData", JSON.stringify(formData));
  };
  const onBlur = () => {
    localStorage.setItem("formData", JSON.stringify(formData));
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    const hasErrors = Object.keys(validationErrors).length > 0;
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    }
    if (!hasErrors) {
      console.info('Data sent:', formData)
      setErrors({});
      handleClearForm();
      handleShowSuccessMessage();
    }
  };

  const handleClearForm = () => {
    localStorage.setItem("formData", JSON.stringify({}));
    setFormData({
      title: "",
      type: "",
      area: "",
      extraDescription: "",
      price: "",
    });
    setQuery("");
  };

  const getSuggestions = (value) => {
    if (value.length >= 3) {
      return new Promise((resolve) => {
        axios(`/places/autocomplete?input=${value}`)
          .catch((error) => {
            console.log(error);
          })
          .then((response) => {
            !response || response.data.error
              ? resolve([])
              : resolve(response.data);
          });
      });
    }
  };

  const onSuggestionsFetchRequested = async ({ value }) => {
    const fetchedSuggestions =
      value.length >= 3 ? await getSuggestions(value) : [];
    setSuggestions(fetchedSuggestions);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    setField("area", {
      placeId: suggestion.placeId,
      mainText: suggestion.mainText,
    });
  };

  const getSuggestionValue = (suggestion) => suggestion.mainText;

  const renderSuggestion = (suggestion) => (
    <div id={suggestion.placeId}>{suggestion.mainText}</div>
  );

  const onQueryChange = (event, { newValue }) => {
    setQuery(newValue);
    setField("area", { placeId: event.target.id, mainText: newValue });
  };

  const handleShowSuccessMessage = () => {
    showSuccessMessage(true);
    setTimeout(() => {
      showSuccessMessage(false);
    }, 5000);
  };

  const inputStyles = cs({
    "form-control": true,
    "is-invalid": Boolean(errors.area),
  });

  const inputProps = {
    placeholder: "Area",
    className: inputStyles,
    value: query,
    onChange: onQueryChange,
    onBlur: onBlur,
  };

  return (
    <div className="d-flex flex-column align-items-center">
      {succesMessage && (
        <Alert className="mt-4" variant="success">
          Congratulations! Your ad is submitted!
        </Alert>
      )}

      <h1 className="mt-3">New property classified</h1>
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
                onBlur={onBlur}
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
                onBlur={onBlur}
                onChange={(e) => setField("type", e.target.value)}
                isInvalid={Boolean(errors.type)}
                as="select"
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

              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                onSuggestionSelected={onSuggestionSelected}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                focusInputOnSuggestionClick={true}
                highlightFirstSuggestion={true}
                theme={styles}
              />
              {Boolean(errors.area) && (
                <div className={styles["invalid-area"]}>{errors.area}</div>
              )}
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Price</Form.Label>
              <Form.Control
                onBlur={onBlur}
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
                onBlur={onBlur}
                onChange={(e) => setField("extraDescription", e.target.value)}
                as="textarea"
                placeholder="Type here"
                value={formData.extraDescription}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3 w-100">
              Submit
            </Button>
            <Button
              variant="outline-info"
              className="mt-3 w-100"
              onClick={handleClearForm}
            >
              Clear form
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

PropertyForm.propTypes = {};

export default PropertyForm;
