const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/prueba', {
    userNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('Database is connected'))