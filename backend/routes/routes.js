// backend/routes/routes.js

import { Router } from "express";
import {
  homepage,
  addCustomer,
  postCustomer,
  view,
  edit,
  editPost,
  deleteCustomer,
} from "../controllers/user-controller.js"; // Adjust the path based on your controller file

const router = Router();

// Define routes
router.get("/", homepage);
router.get("/add", addCustomer);
router.post("/add", postCustomer);
router.get("/view/:id", view);
router.get("/edit/:id", edit);
router.put("/edit/:id", editPost);
router.delete("/users/:id", deleteCustomer);

export default router;
