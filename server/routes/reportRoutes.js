const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const {
  sendReport,
  fetchReports,
  deleteReport
} = require("../controllers/reportControllers");

// Route to send the message to the recipient
router.route("/").post(auth, sendReport);
// Route to retrieve all the message
router.route("/").get(auth, fetchReports);

router.route("/:reportId").delete(auth, deleteReport);

module.exports = router;
