import { Router } from 'express';
import { encodeURL } from '../controllers/url.controller';

const router = Router();

router.post('/encode', encodeURL);

export default router;
