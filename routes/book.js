const { addBook, getBook, deleteBook } = require('../controller/book');
const fetchUser = require('../middleware/fetchUser');

const router = require('express').Router();

router.post('/addbook/:id', fetchUser, addBook)
router.get('/getbook', fetchUser, getBook)
router.delete('/removebook/:id', fetchUser, deleteBook)

module.exports = router