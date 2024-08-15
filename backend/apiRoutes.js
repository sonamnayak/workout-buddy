const router = require("express").Router();

router.use("/workouts", require("./routes/workouts.route"))

module.exports = router;