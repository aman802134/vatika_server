import express from "express";
import authMiddleware from "../middleware/authentication.middleware.js";

const router = express.Router();

router.get("/welcome", authMiddleware, (req, res) => {
  const { id, email, role } = req.userInfo;

  res.json({
    msg: "welcom to test route",
    user: {
      userId: id,
      userEmail: email,
      role: role,
    },
  });
});

export const testRoute = router;
