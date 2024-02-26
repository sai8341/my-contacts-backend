const express = require("express");
const { registerUser, loginUser, currentUser } = require("../controllers/userController");
const validateToken = require("../middleware/valicateTokenHandler");
const router = express.Router();


router.post("/api/users/register", registerUser);
router.post("/api/users/login", loginUser)
router.get("/api/users/current", validateToken, currentUser)

module.exports = router;