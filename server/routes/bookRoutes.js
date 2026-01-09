const router = require("express").Router();
const bookController = require("../controllers/bookController");

router.get("/readlist", bookController.getReadlist);

router.get("/reads", bookController.getReads);

router.get("/add", bookController.getAddPage);

router.get("/:id" , bookController.getEditPage);

router.post("/add", bookController.addBook);

router.put("/:id", bookController.editBook);

router.delete("/:id", bookController.deleteBook);

module.exports = router;