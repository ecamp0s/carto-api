import { Router } from "express";
import { methods as authController } from "../controllers/auth.controllers.js";
import { methods as authValidators } from "../validators/auth.validators.js";

const router  = Router();

router.post('/register', authValidators.userValidator, authController.createUser);
router.post('/login', authValidators.userValidator, authController.login);
 
export default router;