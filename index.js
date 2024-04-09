require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const GlobalErrorHandler = require('./middlewares/error-handler');

const { userRouter } = require('./routes/user');
const { postRouter } = require('./routes/post');
const { applicationRouter } = require('./routes/application');
const { Server } = require('./lib/constants');

const PORT = Server.Port || 3000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: '*',
    }),
);

app.use('/api/v1/user', userRouter);
// app.use('/api/v1/post', postRouter);
// app.use('/api/v1/application', applicationRouter);
app.use(GlobalErrorHandler);

app.get('/', (req, res) => {
    res.send('Health Ok');
});

app.listen(PORT, () => {
    try {
        // Connection to the mongodb database
        mongoose
            .connect('mongodb://localhost:27017/Final_Year_Project')
            .then(() => console.log('MongoDB Connected'));
        console.log(`server started on http://localhost:${PORT}`);
    } catch (error) {
        console.log(`Something Went Wrong error : ${error}`);
        // Killing The process if something went wrong
        process.exit(1);
    }
});
