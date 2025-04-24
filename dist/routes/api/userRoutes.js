import { Router } from 'express';
const router = Router();
import { getSingleUser, getUsers, createUser, deleteUser, updateUser, createFriend, removeFriend } from '../../controllers/usercontrollers.js';
//get and create users
router.route('/').get(getUsers).post(createUser);
// updated user based on ID
router.route('/:userId').put(updateUser);
// delete user based on ID
router.route('/:userId').delete(deleteUser);
//get single user based on ID
router.route('/:userId').get(getSingleUser);
// create new friend
router.route('/:userId/friends/:friendId').post(createFriend);
//delete a friend from a user
router.route('/:userId/friends/:friendId').delete(removeFriend);
export default router;
