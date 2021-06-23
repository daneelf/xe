const validate = (formData) => {
  const { title, type, area, price } = formData;
  const errors = {};
  // name errors
  if (!title || title === "") errors.title = "Cannot be blank!";
  else if (title.length > 155) errors.title = "name is too long!";
  // food errors
  if (!type || type === "") errors.type = "Please select a type";
  // rating errors
  if (!area )
    errors.area = "Please select an area";
  // comment errors
  if (!price ) errors.comment = "Please enter in a price";
  else if (parseInt(price) < 0) errors.price = "Please enter a valid price";

  return errors;
};

export default validate;