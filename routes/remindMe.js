const { addRemindMe, getRemindMe, deleteRemindMe } = require('../controller/remindme');
const fetchUser = require('../middleware/fetchUser');

const router = require('express').Router();

router.post('/addremindme/:id', fetchUser, addRemindMe)
router.get('/getremindme', fetchUser, getRemindMe)
router.delete('/removeremindme/:id', fetchUser, deleteRemindMe)

module.exports = router