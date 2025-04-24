import User from '../models/user.js';
import Thought from '../models/thought.js';
import { Request, Response } from 'express';

//get all users
export const getUsers = async (_req: Request, res: Response) =>{
   try{
      const users = await User.find();
      res.json(users);
   } catch (err) {
      res.status(500).json(err);
    }
}

//get single user
export const getSingleUser = async (req: Request, res:Response) => {
   try{
      const user = await User.findOne({_id:req.params.userId});

      if(!user) {
         res.status(404).json({ message: 'No users with that ID'});
      } else {
         res.json(user);
      }
   } catch (err) {
      res.status(500).json(err);
   }
}

// create new user
export const createUser = async (req:Request, res:Response) =>{
   try{
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
   } catch (err){
      res.status(500).json(err)
   }
}

// update user
export const updateUser = async (req:Request, res:Response) =>{
   try {
      const user = await User.findOneAndUpdate(
         { _id: req.params.userId },
         req.body,
         { new: true }
      );

      if (!user) {
         res.status(404).json({ message: 'User not found' });
      } else {
         res.json(user);
      }
   } catch (err) {
      res.status(500).json(err)
   }
}

// Bonus delete user from database
//remove a user's associated thoughts when deleted
export const deleteUser = async (req: Request, res: Response) => {
   try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
         return res.status(404).json({ message: 'User not found' });
      }

      await Thought.deleteMany({ userId: req.params.id });

      return res.status(200).json({ message: 'User and associated thoughts successfully deleted' });
   } catch (err) {
     return res.status(500).json(err);
   }
}

//create a friend for a user
export const createFriend = async (req: Request, res: Response) => {
   try {
      const friend = await User.findOneAndUpdate(
         { _id: req.params.userId },
         { $addToSet: { friends: req.params.friendId } },
         { new: true }
      );

      if (!friend) {
         res.status(404).json({ message: 'User not found' });
      } else {
         res.json(friend);
      }
   } catch (err) {
      res.status(500).json(err);
   }
}

// delete a friend from a user
export const removeFriend = async (req:Request, res:Response) =>{
   try{
      const updateUser = await User.findOneAndUpdate(
         { _id: req.params.userId },
         { $pull: { friends: req.params.friendId } },
         { new: true }
       );

      if (!updateUser) {
         res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'User friend successfully removed from friends list' });
   } catch (err){
      res.status(500).json(err);
   }
}