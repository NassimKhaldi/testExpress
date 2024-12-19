var express = require("express");
var router = express.Router();
const {
  recherche,
  list,
  create,
  update,
  deleteU,
} = require("./ordinateurService");

router.get("/recherche/:prix", recherche);
router.get("/list", list);
router.post("/create", create);
router.put("/update/:id", update);
router.delete("/delete/:id", deleteU);

module.exports = router;
