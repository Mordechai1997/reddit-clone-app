require('dotenv').config();
const express = require('express')
const cors = require('cors');
const sequelize = require('./db');
const postRoute = require('./routers/post.js');
const commentRoute = require('./routers/comment.js');

const path = require('path');
const app = express();





app.use(express.json());
app.use(cors())
app.use('/comments',commentRoute);
app.use(postRoute);

app.use(express.urlencoded({ extended: true }));

var dir = path.join(__dirname, 'images');
app.use(express.static(dir));




app.listen(process.env.PORT, function () {
    sequelize.sync();
    console.log(`server listening on port ${process.env.PORT}`)

})

