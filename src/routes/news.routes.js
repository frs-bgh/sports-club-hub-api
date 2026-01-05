const express = require("express");
const { validateBody } = require("../middelware/validate");
const { createNewsSchema, updateNewsSchema } = require("../validation/news.schema");
const controller = require("../controllers/news.controller");

const router = express.Router();

router.get("/", controller.listNews);
router.get("/:id", controller.getNews);
router.post("/", validateBody(createNewsSchema), controller.createNews);
router.put("/:id", validateBody(updateNewsSchema), controller.updateNews);
router.delete("/:id", controller.deleteNews);

module.exports = router;