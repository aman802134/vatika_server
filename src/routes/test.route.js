import express from "express";
import authMiddleware from "../middleware/authentication.middleware.js";
import isAdmin from "../middleware/authorization.middleware.js";

const router = express.Router();

router.get("/me", authMiddleware, isAdmin, (req, res) => {
  const { id, email, role } = req.userInfo;

  res.json({
    msg: `welcome ${role}`,
    user: {
      userId: id,
      userEmail: email,
      role: role,
    },
  });
});

export const testRoute = router;
