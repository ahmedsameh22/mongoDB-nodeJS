const router = require("express").Router();
const userControllrt = require("../app/controller/user.controller");
router.get("/", userControllrt.home);
router.get("/add", userControllrt.add);
router.get("/single/:id", userControllrt.showSingle);
router.post("/addLogic", userControllrt.addLogic);
router.get("/delete/:id", userControllrt.deleteUser);
router.get("/edit/:id", userControllrt.edit);
router.post("/edit/:id", userControllrt.editlogic);
module.exports = router;
