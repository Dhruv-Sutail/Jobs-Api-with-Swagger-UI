const express = require("express");
const router = express.Router();

const {
  getAllJobs,
  createJob,
  getJob,
  deleteJob,
  updateJob,
} = require("../controllers/jobs");

router.route("/").get(getAllJobs).post(createJob);
router.route("/:id").get(getJob).delete(deleteJob).patch(updateJob);

module.exports = router;
