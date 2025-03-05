import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(400)
      .json({ msg: "access denied ! please login again .." });
  }
  try {
    const decodedUserInfo = jwt.verify(token, process.env.JWT_SECRET);
    req.userInfo = decodedUserInfo;
    next();
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "access denied ! please login again .." });
  }
};

export default authMiddleware;
