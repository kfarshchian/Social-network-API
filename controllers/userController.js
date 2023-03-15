const { User, Thought } = require('../models');

module.exports = {
  // Get all courses
  getUser(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get a course
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a course
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a course
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No course with that ID' })
          : Student.deleteMany({ _id: { $in: user.thought } })
      )
      .then(() => res.json({ message: 'Course and students deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
    // add friend
    addFriend({ params }, res) {
      User.findOneAndUpdate(
        { _id: params.userId },
        { $addToSet: { friends: params.friendId } },
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
  
    // delete friend
    removeFriend({ params }, res) {
      User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { friends: params.friendId } },
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
};

