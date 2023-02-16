import { Router } from "express";
import {
  registerValidation,
  loginValidation,
} from "../middlewares/validation/authValidation/userValidation";
import { register, login, getUser } from "../controller/user.controller";

const router = Router();

router.route("/register").post(registerValidation, register);
router.route("/login").post(loginValidation, login);
router.route("/").get(getUser);

export default router;
