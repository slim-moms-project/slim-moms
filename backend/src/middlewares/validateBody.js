export const validateBody = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: true,
      allowUnknown: false,
      stripUnknown: true,
    });

    // Eğer bir hata varsa controllera gitmeden 400 bad request
    if (error) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: error.details[0].message,
      });
    }

    // Joi ile temizlenen body'i bir sonraki adıma taşır
    req.body = value;

    // Hata yoksa bir sonraki adıma geçer
    next();
  };
};
