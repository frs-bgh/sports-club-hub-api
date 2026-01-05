const { Prisma } = require("@prisma/client");

function errorMiddleware(err, req, res, next) {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return res.status(409).json({
        message: "unique constraint failed",
        meta: err.meta,
      });
    }
  }

  console.error(err);
  res.status(err.statusCode || 500).json({
    message: err.message || "internal server error",
  });
}

module.exports = { errorMiddleware };