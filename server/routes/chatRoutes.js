const router = require("express").Router();
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  deleteGroup,
  removeFromGroup,
} = require("../controllers/chatControllers");
const auth = require("../middleware/authMiddleware");

router.route("/").post(auth, accessChat).get(auth, fetchChats);

router.route("/group").post(auth, createGroupChat);

router.route("/grouprename").put(auth, renameGroup);

router.route("/groupremove").put(auth, removeFromGroup);

router.route("/groupadd").put(auth, addToGroup);

router.route("/deletegroup").put(auth, deleteGroup);

module.exports = router;
