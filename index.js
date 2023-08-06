const connectToMongo = require('./db');
connectToMongo();

const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', require('./routes/autification'));
app.use('/api/contact', require('./routes/Contact'));

const port = 5000;
app.listen(port, () => {
    console.log(`Your server is listening at http://localhost:${port}`);
});
