import { Router } from "express";
import { methods as paystatsController } from "../controllers/paystats.controllers";
import { methods as paystatsValidators } from "../validators/paystats.validators";

const router  = Router();

router.get('/totalTurnover', paystatsValidators.queryValidator, paystatsController.getTotalTurnover);
router.get('/turnoverByGender', paystatsValidators.queryValidator, paystatsController.getTurnoverByGender);
router.get('/monthlyTurnoverByGender', paystatsValidators.queryValidator, paystatsController.getMonthlyTurnoverByGender);

export default router;