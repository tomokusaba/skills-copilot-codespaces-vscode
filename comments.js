// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Comment = require('./models/comment');
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/comments';
// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the comments API');
});
app.get('/comments', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});