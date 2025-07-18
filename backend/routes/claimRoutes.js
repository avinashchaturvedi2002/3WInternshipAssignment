import express from "express"
import { getClaimHistory } from "../controllers/claimHistoryController.js";
const router=express.Router();
router.get('/claim-history', getClaimHistory);
export default router