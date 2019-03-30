require('dotenv').config();

const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
    //   Routes
      user = require('./routes/user/user'),
      userAuth = require('./routes/user/userAuth'),
      question = require('./routes/questions/question'),
      questionAuth = require('./routes/questions/questionAuth');

// Headers
app.use(require('./middleware/headers'));

// Express static
app.use(express.static(__dirname + '/public'));

// Bodyparser
app.use(bodyParser.json());

// Mongodb
const mongoose = require('mongoose');
mongoose.connect('mongodb://ikolajm:090498jake@ds117806.mlab.com:17806/fix-my-ship', { useNewUrlParser: true })
    .then(() => console.log('Mongo database connected on MLAB...'))
    .catch(err => console.log(err.message))

// Route Requiring

    // Test connection
    app.get('/test', (req, res) => {
        res.send('Sup playa')
    })

    // Unprotected
    app.use('/user', user);
    app.use('/questions', question)

    // Protected
    app.use(require('./middleware/session-validation'));
    app.use('/user', userAuth);
    app.use('/questions', questionAuth);

// Listener
app.listen(process.env.PORT, () => {
    console.log(`App is live on ${process.env.PORT}`)
})
      