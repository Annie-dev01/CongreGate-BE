const express = require("express");
const { protectAdmin } = require("../middlewares/auth.middleware");
const { createAnnouncement, getAllAnnouncements } = require("../controllers/announcement.controller");
const { protect } = require("../middlewares/auth.middleware");
const { announcementValidator } = require("../middlewares/inputValidators");
const router = express.Router();

router.post("/", protectAdmin, announcementValidator ,createAnnouncement);
router.get("/", protect, getAllAnnouncements);

module.exports = router;