const validate = (schemas) => (req, res, next) => {
  for (const [key, schema] of Object.entries(schemas)) {
    req[key] = schema.parse(req[key]);
  }
  next();
};

export default validate;
