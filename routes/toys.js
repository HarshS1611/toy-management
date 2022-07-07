import express from 'express';
import { getToys, addToy, getDetails, updateDetails, deleteToy } from '../controllers/toys.js';

const router = express.Router();

router.get('/', getToys);
router.post('/', addToy);
router.get('/search', getDetails);
router.patch('/:id', updateDetails);
router.delete('/:id', deleteToy);


export default router;