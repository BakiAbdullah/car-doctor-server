const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

//This comment should remove in Production
console.log(process.env.DB_USER);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lmleurz.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const serviceCollection = client.db("carDoctor").collection("services");
    const bookingCollection = client.db("carDoctor").collection("bookings");

    //? To READ Service data & Show in the UI (READ)
    app.get("/services", async (req, res) => {
      const cursor = serviceCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    //? To READ Specific One Data from Database and send them to Frontend/Client Side
    app.get("/services/:id", async (req, res) => {
      const id = req.params.id;
      // Query for a single Data that has the id
      const query = { _id: new ObjectId(id) };
      const options = {
        // Include only the `title`, `price` and `service_id` fields in the returned document
        projection: { title: 1, price: 1, service_id: 1 },
      };
      const result = await serviceCollection.findOne(query, options);
      res.send(result);
    });

    //Bookings
    app.post('/bookings', async(req,res)=>{
      const booking = req.body;
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// To CHECK IF THE SERVER IS RUNNING!!
app.get("/", (req, res) => {
  res.send("Car Doctor is Running");
});

app.listen(port, () => {
  console.log(`Car Doctor SERVER is Running on PORT:${port}`);
});
