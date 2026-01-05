function validateBody(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "validation error",
        errors: result.error.flatten(),
      });
    }

    req.body = result.data;
    next();
  };
}

module.exports = { validateBody };