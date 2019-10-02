
/*

const MongoClient = require('mongodb').MongoClient;

// replace the uri string with your connection string.
const uri = "mongodb+srv://karina2004liz:<password>@firstdatabase-t9rak.gcp.mongodb.net/test?retryWrites=true&w=majority";
MongoClient.connect(uri, function(err, client) {
   if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }
   console.log('Connected...');
   const collection = client.db("test").collection("devices");
   // perform actions on the collection object
   client.close();
});


*/

const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const CONNECTION_URL = "mongodb+srv://admin:nekoffee@nekoffee-6mrwt.mongodb.net/test?retryWrites=true&w=majority";
const DATABASE_NAME = "Nekoffee";

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

var database, collection;

app.listen(3000, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("products");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});



app.get("/products", (request, response) => {
    console.log("products route");
   collection.find({}).toArray((error, result) => {
       if(error) {
           return response.status(500).send(error);
       }
       response.json(result);
   });
});