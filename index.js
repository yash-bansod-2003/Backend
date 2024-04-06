require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const GlobalErrorHandler = require('./middlewares/error-handler');
const StudentRouter = require('./routes/student-router');
const UserRouter = require('./routes/user-router');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(
    cors({
        origin: '*',
    }),
);

app.use('/api/v1/user', UserRouter);
app.use('/api/v1/student', StudentRouter);
app.use(GlobalErrorHandler);

app.get('/', (req, res) => {
    res.send('Hello World Message');
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
