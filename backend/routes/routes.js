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
  getUsers,
} from "../controllers/user-controller.js"; // Adjust the path based on your controller file

const router = Router();

// Define routes
router.get("/homepage", homepage);
router.get("/add", addCustomer);
router.post("/add", postCustomer);
router.get("/view/:id", view);
router.get("/edit/:id", edit);
router.put("/edit/:id", editPost);
router.delete("/users/:id", deleteCustomer);

// New route for paginated users
router.get("/", getUsers);

export default router;
