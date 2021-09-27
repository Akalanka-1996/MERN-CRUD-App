const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const url = process.env.ATLAS_URI;

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//db connection
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, err => {
    if(err) throw err;
    console.log("Connected to MongoDB");
})

//load routers
const appointmentRouter = require('./routes/appointment');
app.use('/appointments', appointmentRouter);


app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})
