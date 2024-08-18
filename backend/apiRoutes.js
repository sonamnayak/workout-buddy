const router = require("express").Router();
const checkAuth = require("./middleware/checkAuth")

router.use("/workouts", checkAuth, require("./routes/workouts.route"))
router.use("/auth", require("./routes/auth.route"))

module.exports = router;