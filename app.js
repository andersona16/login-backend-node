require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorHandler');
const appConfig = require('./config/appConfig');

const app = express();

app.use(express.json());
app.use(cors(appConfig.corsOptions));

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

app.use(errorHandler);


const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose
    .connect(
        `mongodb+srv://${dbUser}:${dbPassword}@cluster0.6ao3i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    )
    .then(() => {
        app.listen(3000);
        console.log("Conectou ao banco!");
    })
    .catch((err) => console.log(err));

