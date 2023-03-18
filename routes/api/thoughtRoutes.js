const router = require('express').Router();
const {
  getThought,
  getSingleThought,
  createThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

// /api/Thought
router.route('/').get(getThought).post(createThought);

// /api/Thought/:ThoughtId
router.route('/:id').get(getSingleThought).delete(deleteThought);

//post/delete reaction route /api/Thought/:id/reaction
router.route('/:id/reaction').post(createReaction).delete(deleteReaction)


module.exports = router;
