import { Router } from 'express';
const router = Router();
import { getSingleThought, getThoughts, createthought, deletethought, updatethought, createReaction, deleteReaction } from '../../controllers/thoughtControllers.js';
//get and create new thought
router.route('/').get(getThoughts).post(createthought);
//get single though based on ID
router.route('/:thoughtId').get(getSingleThought);
// updated thought based on ID
router.route('/:thoughtId').put(updatethought);
// delete thought based on ID
router.route('/:thoughtId').delete(deletethought);
// create a reaction for a thought
router.route('/:thoughtId/reactions').post(createReaction);
//delte a reaction for a thought
router.route('/:thoughtId/reaction/:reactionId').delete(deleteReaction);
export default router;
