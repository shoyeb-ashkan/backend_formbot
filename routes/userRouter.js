const router = require("express").Router();
const registerUser = require("../controllers/user/registerUser");
const validateUser = require("../middleware/user/validateUser");
const loginUser = require("../controllers/user/loginUser");
const validateToken = require("../middleware/validateToken");
const getUserDetails = require("../controllers/user/getUserDetails");
const validateUpdateInput = require("../middleware/user/validateUpdateInput");
const updateUserDetails = require("../controllers/user/updateUserDetails");

router.post("/register", validateUser, registerUser);
router.post("/login", validateUser, loginUser);
router.get("/", validateToken, getUserDetails);
router.put("/update", validateToken, validateUpdateInput, updateUserDetails);

module.exports = router;
