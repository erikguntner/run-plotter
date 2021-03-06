// Main starting point of application
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./router');
const errorHandlers = require('./handlers/errorHandlers');
require('dotenv').config();

const app = express();

// App Setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
app.use(cookieParser());

app.use(errorHandlers.developmentErrors);

// app.use(errorHandlers.productionErrors);

// Connect to Mongo
const db = process.env.MONGO_URI;
mongoose
  .connect(db, { useNewUrlParser: true }) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Pass express app to our router
router(app);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  app.use('*', express.static('client/build')); // Added this

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//Server Setup
const port = process.env.PORT || 3090;
app.listen(port, () => console.log(`listening on port ${port}`));
