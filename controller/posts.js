const { validationResult } = require('express-validator')

const addPost = (req, res) => {
    let success = false;
    const error = validationResult(req);
    if (!error.isEmpty())
        return res.status(400).json({ success, error })
    

}