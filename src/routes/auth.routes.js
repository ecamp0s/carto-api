import { Router } from "express";
import { methods as authController } from "../controllers/auth.controllers";
import { methods as authValidators } from "../validators/auth.validators";

const router  = Router();

router.post('/register', authValidators.userValidator, authController.createUser);
router.post('/login', authValidators.userValidator, authController.login);
 
export default router;