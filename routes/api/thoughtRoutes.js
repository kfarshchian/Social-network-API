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
router
  .route('/:id')
  .get(getSingleThought)
  .delete(deleteThought);

//post reaction route /api/Thought/:id/reaction
router
  .route('/thought/:id/reaction')
  .post(createReaction)

//Delete reaction route /api/Thought/:id/reaction
router
  .route('/thought/:id/reaction/:id')
  .delete(deleteReaction)

module.exports = router;
