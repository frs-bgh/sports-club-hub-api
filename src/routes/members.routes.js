const express = require("express");
const { validateBody } = require("../middelware/validate");
const { createMemberSchema, updateMemberSchema } = require("../validation/member.schema");
const controller = require("../controllers/members.controller");

const router = express.Router();

router.get("/", controller.listMembers);
router.get("/:id", controller.getMember);
router.post("/", validateBody(createMemberSchema), controller.createMember);
router.put("/:id", validateBody(updateMemberSchema), controller.updateMember);
router.delete("/:id", controller.deleteMember);

module.exports = router;