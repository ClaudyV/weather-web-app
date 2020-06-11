// Declare the required libraries
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const request = require('request');
const weatherCollection = "info";
const cron = require('node-cron');

// Body parser and running port
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))
app.listen(3000, () => console.log('blog server running on port 3000!'))

// Weather API URL
let url = "https://data.taipei/opendata/datalist/apiAccess?scope=resourceAquire&rid=1f1aaba5-616a-4a33-867d-878142cac5c4";

// Make a request and parse the weather data
request(url, function(error, response, body){

  if(!error && response.statusCode == 200){
    let data = JSON.parse(body);
    let MongoClient = require('mongodb').MongoClient;
    let url = "mongodb://localhost:27017";

    // Connect to Mongo Database
    MongoClient.connect( url, { useUnifiedTopology: true }, function(err, client) {
      if (err) throw err;
      let db = client.db('Weather');
      let myobj = [];
      myobj.push(data);

      // Insert the weather data in Mongo Database inside "info" collection
      db.collection(weatherCollection).insertMany(myobj, { forceServerObjectId: true }, function(err, res) {
        if (err) throw err;
        console.log("Number of documents inserted: " + res.insertedCount);
      });

      // Create GET REST API for public API
      app.get("/api/weather-info", function(req, res) {
        db.collection(weatherCollection).find({}).toArray(function(err, docs) {
          if (err) {
            handleError(res, err.message, "Failed to get weather info.");
          } else {
            res.status(200).json(docs);
            console.log(res)
          }
        });
      });

      // Handle errors
      function handleError(res, reason, message, code) {
        console.log("ERROR: " + reason);
        res.status(code || 500).json({"error": message});
      }

      // Update the weather data every hour
      cron.schedule('0 * * * *', () => {
        console.log('Running a task every hour');
        let myobj = [];
        myobj.push(data);
        db.collection(weatherCollection).insertMany(myobj, { forceServerObjectId: true }, function(err, res) {
          if (err) throw err;
          console.log("Number of documents inserted: " + res.insertedCount);
        });

        app.get("/api/weather-info", function(req, res) {
          db.collection(weatherCollection).find({}).toArray(function(err, docs) {
            if (err) {
              handleError(res, err.message, "Failed to get weather info.");
            } else {
              res.status(200).json(docs);
              console.log(res)
            }
          });
        });
      });
    });
  }
});





