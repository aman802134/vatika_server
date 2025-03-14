import express from "express";
import isAdmin from "../middleware/authorization.middleware.js";
import authMiddleware from "../middleware/authentication.middleware.js";

const router = express.Router();

router.get("/admin", authMiddleware, isAdmin, (req, res) => {
  const { id, email, role } = req.userInfo;

  res.json({
    msg: "welcome to admin route",
    user: {
      userId: id,
      userEmail: email,
      role: role,
    },
  });
});

export const adminRoute = router;
