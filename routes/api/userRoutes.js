const router = require('express').Router();
const {
  getUser,
  getSingleUser,
  createUser,
  deleteUser,
  addFriend,
  removeFriend,
  updateUser,
} = require('../../controllers/userController');

// /api/User
router.route('/').get(getUser).post(createUser);

// /api/User/:UserId
router.route('/:id').get(getSingleUser).delete(deleteUser);

// /api/user/:userId
router.route('/:id').put(updateUser)

// /api/User/:UserId/friendId
router.route('/:id/friends/:id').post(addFriend).delete(removeFriend);;


module.exports = router;
