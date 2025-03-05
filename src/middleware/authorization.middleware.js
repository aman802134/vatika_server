const isAdmin = (req, res, next) => {
  const role = req.userInfo.role;
  if (role !== "admin") {
    return res
      .status(400)
      .json({ msg: "access denied ! only admin can access" });
  }
  next();
};

export default isAdmin;
