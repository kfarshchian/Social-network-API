const router = require('express').Router();
const {
  getUser,
  getSingleUser,
  createUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/User
router.route('/').get(getUser).post(createUser);

// /api/User/:UserId
router.route('/:id').get(getSingleUser).delete(deleteUser);

// /api/User/:UserId/friendId
router.route('/:id/friends/:id').post(addFriend).delete(removeFriend);;


module.exports = router;
