import { Router } from "express";
import { Auth } from "../middleware/auth.middleware";

const router = Router();

router.use(Auth);

router.post('/signup' , Signup);

router.post('login', login);

export default router;