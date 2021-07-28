const mongoose = require('mongoose');
const connection_url = 'mongodb+srv://Sagar:sagar@cluster0.ffj1z.mongodb.net/User?retryWrites=true&w=majority';

mongoose.connect(connection_url, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Connected");
    })
    .catch((err) => {
        console.log(err);

    });