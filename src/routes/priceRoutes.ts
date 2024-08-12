import { Router } from "express";
import { getPriceController } from "@controllers/priceController";

const router = Router();

router.post("/get-price", getPriceController);

export default router;
