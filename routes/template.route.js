import express from "express";
const router = express.Router();

// Controllers
import {
  getTemplate,
  createTemplate,
  updateTemplate,
} from "../controller/template/template.controller.js";

router.get("/get-template", getTemplate);
router.post("/create-template", createTemplate);
router.patch("/update-template", updateTemplate);

export default router;
