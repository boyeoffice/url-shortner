import { Router } from 'express';
import { encodeURL, decodeUrl, getUrlStatistic, listUrls } from '../controllers/url.controller';

const router = Router();

router.post('/encode', encodeURL);
router.post('/decode', decodeUrl);
router.get('/statistic/:url_path', getUrlStatistic);
router.get('/list', listUrls);

export default router;
