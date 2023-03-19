const { User, Thought } = require('../models');
const { ObjectId } = require('mongoose').Types;

module.exports = {
  // Get all users
  getUser(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get a user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.id })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.id })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No User with that ID' })
          : Thought.deleteMany({ _id: { $in: user.thought } })
      )
      .then(() => res.json({ message: 'User and thoughts deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
    // add a friend
    addFriend({ params }, res) {
      User.findOneAndUpdate(
        { _id: params.id },
        { $addToSet: { friends: params.id } },
        { new: true, runValidators: true }
      )
        .then((user) => {
          if (!user) {
            res.status(404).json({ message: "No user with this id" });
            return;
          }
          res.json(user);
        })
        .catch((err) => res.json(err));
    },
  
    // delete a friend
    removeFriend({ params }, res) {
      User.findOneAndUpdate(
        { _id: params.id },
        { $pull: { friends: params.id } },
        { new: true }
      )
        .then((user) => {
          if (!user) {
            return res.status(404).json({ message: "No user with this id!" });
          }
          res.json(user);
        })
        .catch((err) => res.json(err));
    },
    //Update user
    updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(user => {
        if (!user) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(user);
      })
      .catch(err => res.json(err));
  },
};

