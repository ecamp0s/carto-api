import { Router } from "express";
import { methods as postalCodesController } from "../controllers/postal_codes.controllers.js";

const router  = Router();

router.get('/turnOverByGender', postalCodesController.getTurnOverByGender);
router.get('/geometries/:id', postalCodesController.getGeometry);
router.get('/geometries', postalCodesController.getGeometries);

export default router;