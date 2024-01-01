const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res
      .status(403)
      .json({ message: "Une autorisation d'accès est obligatoire!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;

    // Check user role and restrict access if necessary
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Vous n'avez pas les autorisations nécessaires!" });
    }
  } catch (err) {
    return res.status(401).json({ message: "Autorisation invalide" });
  }
  return next();
};

module.exports = verifyToken;
