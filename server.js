const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())
// Configuring the database
const dbConfig = require('./config/db.config.js');
const mongoose = require('mongoose');
// Connecting to the database
mongoose.connect(dbConfig.url, {
useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database.', err);
  process.exit();
});
// define a root/default route
app.get('/', (req, res) => {
   res.json({"message": "Hello World"});
});
// Route
const user=require('./controllers/employe');
const { application } = require('express');
app.use('/api/company',user)
const port = process.env.PORT || 3000;
// listen for requests
app.listen(port, () => {
   console.log(`Node server is listening on port ${port}`);
});
