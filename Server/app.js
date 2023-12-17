const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const app = express();
const dotenv = require("dotenv").config();
const cors= require('cors')

//connect to db
require('./db/connection')

app.use(express.json());
app.use(cors());
app.use(errorHandler);
app.use('/api/auth', require('./Router/authRouter'))
app.use('/api/user', require('./Router/userRouter'))
app.use('/api/comments', require('./Router/commentRouter'))
app.use('/api/video', require('./Router/videoRouter'))

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`server running on port ${port}`);
})
