const router = require("express").Router();
const {
  registerUser,
  loginUser,
  allUsers,
  fetchUsers,
  setMod
} = require("../controllers/userControllers");
const auth = require("../middleware/authMiddleware");

router.route("/").post(registerUser).get(auth, allUsers);
router.route("/login").post(loginUser);
router.route("/").get(auth, fetchUsers);
router.route("/mod").put(auth, setMod);

module.exports = router;
