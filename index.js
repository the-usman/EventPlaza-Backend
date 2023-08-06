const connectToMongo = require('./db');
connectToMongo();

const express = require('express');
const cors = require('cors');
const Adim = require('./modals/Adim');

const app = express();
app.use(express.json());
app.use(cors());



app.use('/uploads', express.static('uploads'));
app.use('/api/auth', require('./routes/autification'));
app.use('/api/contact', require('./routes/Contact'));
app.use('/api', require('./routes/post'));

app.post('/', (req, res) => {
    res.send("Hello its running")
})

const port = 5000;
app.listen(port, () => {
    console.log(`Your server is listening at http://localhost:${port}`);
});
