const validate = (formData) => {
  const { title, type, area, price } = formData;
  const errors = {};

  if (!title || title === "") errors.title = "Cannot be blank!";
  else if (title.length > 155) errors.title = "name is too long!";

  if (!type || type === "") errors.type = "Please select a type";

  if (!area) errors.area = "Please select an area";

  if (!price || price === "") errors.price = "Please enter a price";
  else if (parseInt(price) <=0)
    errors.price = "Please enter a number greater than 0";

  return errors;
};

export default validate;
