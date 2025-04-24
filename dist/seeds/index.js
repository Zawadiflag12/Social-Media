"use strict";
// import db from '../config/connection.js';
// import { User, Thought } from '../models/index.js';
// import cleanDB from './cleanDB.js';
// import { Schema } from 'mongoose';
// try {
//   await db();
//   await cleanDB();
//   // Create empty array to hold the Thoughts
//   const thoughtsArray: { [key: string]: any }[] = [];
//   // Create empty array to hold the Users
//   const usersArray: { [key: string]: any }[] = [];
//   // Add Thoughts to the collection and await the results
//   const thoughtData = await Thought.create(thoughtsArray);
//   const userData = await User.create(usersArray);
//   // const friendData = await Friend.create([]);
//   // const reactionData = await Reaction.create([]);
//   // create a sample user to the collection and await the results
//  const sampleUser = await User.create({
//     name: 'Jacob Black',
//     email: 'Jacob_B@gmail.com',
//     thoughts: [...thoughtData.map(({ _id }: { [key: string]: any }) => _id)],
//     // friends: [...friendData.map(({ _id }: { [key: string]: any }) => _id)],
//   });
// // create a sample thought to a collection 
// const sampleThought = await Thought.create({
//    thoughtText:'This is a sample thought',
//    username: sampleUser.get('name'),
//    reactions: [...reactionData.map(({ _id }: { [key: string]: any }) => _id)],
// })
//   // Update user with new thought
//   sampleUser.thoughts = sampleUser.thoughts || [];
//   sampleUser.thoughts.push(sampleThought._id as unknown as Schema.Types.ObjectId);
//   await sampleUser.save();
//   // Log out the seed data to indicate what should appear in the database
//   console.table(thoughtData);
//   console.table(userData);
//   console.info('Seeding complete! 🌱');
//   process.exit(0);
// } catch (error) {
//   console.error('Error seeding database:', error);
//   process.exit(1);
// }
