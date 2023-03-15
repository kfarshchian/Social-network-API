const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
  // Get all students
  getThought(req, res) {
    Thought.find()
      .then(thoughts => res.json(thoughts))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  // Get a single student
  getSingleThought(req, res) {
    Student.findOne({ _id: req.params.id })
      .then(thoughts => {
        if (!thoughts) {
          res.status(404).json({ message: 'No thoughts found with that id!' });
          return;
        }
        res.json(thoughts);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  // create a new student
  createThought({ body }, res) {
    Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then(thoughts => {
            if (!thoughts) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(thoughts);
        })
        .catch(err => res.json(err));
},
  // Delete a student and remove them from the course
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then(thoughts => {
        if (!thoughts) {
          res.status(404).json({ message: 'No thoughts found with that id!' });
          return;
        }
        return User.findOneAndUpdate(
          { _id: parmas.userId },
          { $pull: { thoughts: params.Id } },
          { new: true }
        )
      })
      .then(thoughts => {
        if (!thoughts) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(thoughts);
      })
      .catch(err => res.json(err));
  },

  createReaction({params, body}, res) {
    Thought.findOneAndUpdate(
      {_id: params.thoughtId}, 
      {$push: {reactions: body}}, 
      {new: true, runValidators: true})
    .populate({path: 'reactions', select: '-__v'})
    .select('-__v')
    .then(thoughts => {
        if (!thoughts) {
            res.status(404).json({message: 'No thoughts with this ID.'});
            return;
        }
        res.json(thoughts);
    })
    .catch(err => res.status(400).json(err))
},

  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then(thoughts => {
        if (!thoughts) {
          res.status(404).json({ message: 'No reaction with this ID!'});
          return;
        }
       res.json(thoughts);
      })
      .catch(err => res.json(err));
  },
};
