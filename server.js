
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



require('dotenv').config();

const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const cors = require('cors');



const user = process.env.DB_USER;
const pass = process.env.DB_PASS;

const CONNECTION_URL = `mongodb+srv://${user}:${pass}@nekoffee-6mrwt.mongodb.net/test?retryWrites=true&w=majority`;
const DATABASE_NAME = "Nekoffee";

var app = Express();







app.use(cors());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: false }));

var database, collection;

app.listen(3000, () => {
  const dataMongo =  MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("products");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});


app.get("/", (req,res)=>{

res.send("Ingresa /products para ver la data")

})



app.get("/products", (request, response) => {
    console.log("products route");
   collection.find({}).toArray((error, result) => {
       if(error) {
           return response.status(500).send(error);
       }
       response.json(result);
   });
});

app.get("/", (request, response) => {
    response.send("hola");
});
