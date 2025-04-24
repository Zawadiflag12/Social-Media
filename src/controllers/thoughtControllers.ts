import Thought from '../models/thought.js';
import { Request, Response } from 'express';
import User from '../models/user.js';
//get all thoughts
export const getThoughts = async (_req: Request, res: Response) =>{
   try{
      const thoughts = await Thought.find();
      res.json(thoughts);
   } catch (err) {
      res.status(500).json(err);
    }
}

//get single thought
export const getSingleThought = async (req: Request, res:Response) => {
   try{
      const thought = await Thought.findOne({_id:req.params.thoughtId});

      if(!thought) {
         res.status(404).json({ message: 'No thoughts with that ID'});
      } else {
         res.json(thought);
      }
   } catch (err) {
      res.status(500).json(err);
   }
}

// create new thought
// push it to thoughts array
export const createthought = async (req: Request, res: Response) => {
   try {
      const { username, thoughtText } = req.body;

      if (!username || !thoughtText) {
         return res.status(400).json({ message: 'Username and thought text are required' });
      }

      // Find user by username
      const user = await User.findOne({ username });
      if (!user) {
         return res.status(404).json({ message: 'User not found' });
      }

      // Create the thought and store the user's _id in the 'username' field
      const dbthoughtData = await Thought.create({
         thoughtText,
         username: user._id, 
      });

      // Push thought to user's thoughts array
      if (!user.thoughts) {
         user.thoughts = [];
      }
      user.thoughts.push(dbthoughtData._id as typeof user.thoughts[0]);
      await user.save();

     return  res.json(dbthoughtData);
   } catch (err) {
      return res.status(500).json(err);
   }
};

// update thought by Id
export const updatethought = async (req:Request, res:Response) =>{
   try {
      const thought = await Thought.findOneAndUpdate(
         { _id: req.params.id },
         req.body,
         { new: true }
      );

      if (!thought) {
         res.status(404).json({ message: 'Thought not found' });
      } else {
         res.json(thought);
      }
   } catch (err) {
      res.status(500).json(err)
   }
}

// delete thought
export const deletethought = async (req: Request, res: Response) => {
   try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
         return res.status(404).json({ message: 'thought not found' });
      }
      res.status(200).json({ message: 'thought and associated thoughts successfully deleted' });
      return;
   } catch (err) {
      res.status(500).json(err);
      return;
   }
}

//create a reaction and store to a thought
export const createReaction = async (req: Request, res: Response) => {
   try {
      const reaction = await Thought.findOneAndUpdate(
         { _id: req.params.thoughtId },
         { $addToSet: { reactions: req.body } },
         { new: true }
      );

      if (!reaction) {
         res.status(404).json({ message: 'Reaction not found' });
      } else {
         res.json(reaction);
      }
   } catch (err) {
      res.status(500).json(err);
   }
}

//delete a reaction by id
export const deleteReaction = async (req:Request, res:Response) =>{
   try{
      const { thoughtId } = req.params;
      const { reactionId } = req.params; 
  
      if (!reactionId) {
        return res.status(400).json({ message: 'Reaction ID is required' });
      }
  
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $pull: { reactions: { reactionId: reactionId } } },
        { new: true }
      );
  
      if (!updatedThought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      return res.status(200).json({ message: 'Reaction successfully deleted' });
   } catch (err){
      return res.status(500).json(err);
   }
}