const { addFavorite, getFavorite, deleteFavorite } = require('../controller/favourite');
const fetchUser = require('../middleware/fetchUser');

const router = require('express').Router();

router.post('/addfavourite/:id', fetchUser, addFavorite)
router.get('/getfavourite', fetchUser, getFavorite)
router.post('/removefavourite/:id', fetchUser, deleteFavorite)

module.exports = router