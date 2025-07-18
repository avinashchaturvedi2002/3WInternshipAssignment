import express from 'express';
import  validate  from '../middleware/validationMiddleware.js'; 
import { createUserSchema, claimPointSchema, paginationSchema } from '../validation/validationSchemas.js'
import {addUser, claimPoints, getAllUsers} from '../controllers/userController.js';
import {getClaimHistory} from '../controllers/claimHistoryController.js';

const router = express.Router();
router.post('/', validate(createUserSchema), addUser);
router.get('/', validate(paginationSchema), getAllUsers);
router.post('/claim-points', validate(claimPointSchema), claimPoints);


export default router;