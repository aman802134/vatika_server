import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  console.log(req.access_token);
  const token = req.cookies && req.cookies.access_token;
  if (!token) {
    return res
      .status(400)
      .json({ msg: "you are not logged-in , please login..." });
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
