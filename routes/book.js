const {addBookRequest, getRequests, AcceptRequest, RejectRequest, getBook} = require('../controller/requestBook')
const fetchUser = require('../middleware/fetchUser');

const router = require('express').Router();

router.post('/addbookrequest/:id', fetchUser, addBookRequest)
router.get('/getbookreq', fetchUser, getRequests)
router.get('/getbook', fetchUser, getBook)
router.post('/acceptreq/:id', fetchUser, AcceptRequest)
router.post('/rejectreq/:id', fetchUser, RejectRequest)

module.exports = router