const express = require('express');
const router = express.Router();

const AWS = require('aws-sdk');
const awsConfig = {
  region: 'us-east-2',
};
AWS.config.update(awsConfig);
// using documentClient to use native JS objects to interface with dynamodb service object
const dynamodb = new AWS.DynamoDB.DocumentClient();
// set table value
const table = 'Thoughts';

// get route
router.get('/users', (req, res) => {
    const params = {
      TableName: table,
    };
    // Scan return all items in the table
    dynamodb.scan(params, (err, data) => {
      if (err) {
        res.status(500).json(err); // an error occurred
      } else {
        res.json(data.Items);
      }
    });
  });
// access all thoughts from a single user
router.get('/users/:username', (req, res) => {
    console.log(`Querying for thought(s) from ${req.params.username}.`);
    const params = {
        TableName: table,
        // specify the search criteria
        KeyConditionExpression: '#un = :user',
        // aliasing
        ExpressionAttributeNames: {
          '#un': 'username',
          '#ca': 'createdAt',
          '#th': 'thought',
        },
        ExpressionAttributeValues: {
          ':user': req.params.username,
        },
        // define which attributes or columns will be returned
        ProjectionExpression: '#th, #ca',
        // default setting is true - asc. false - desc
        ScanIndexForward: false,
      };
    //   query params
      dynamodb.query(params, (err, data) => {
        if (err) {
          console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
          res.status(500).json(err); // an error occurred
        } else {
          console.log("Query succeeded.");
          res.json(data.Items)
        }
      });
    }); // closes the route for router.get(users/:username)

// Create new thought at /api/users
router.post('/users', (req, res) => {
    const params = {
      TableName: table,
      Item: {
        username: req.body.username,
        createdAt: Date.now(),
        thought: req.body.thought,
      },
    };
    // database call
    dynamodb.put(params, (err, data) => {
        if (err) {
          console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
          res.status(500).json(err); // an error occurred
        } else {
          console.log("Added item:", JSON.stringify(data, null, 2));
          res.json({"Added": JSON.stringify(data, null, 2)});
        }
      });
    });  // ends the route for router.post('/users')


  module.exports = router;