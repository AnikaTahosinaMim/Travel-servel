const express = require("express");
const dontenv = require("dotenv");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { jwtVerify, createRemoteJWKSet } = require("jose-cjs");

dontenv.config();
const uri = process.env.MONGODB_URI;
const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
const JWKS = createRemoteJWKSet(new URL(`${process.env.CLIENT_URL}/api/auth/jwks`));
const varify = async (req, res, next) => {
  const authHeader = req?.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Unsuthorized" });
  }
  

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unsuthorized" });
  }
  const { payload } = await jwtVerify(token, JWKS);
  console.log(payload);
  next();

  console.log(token);
};
async function run() {
  try {
    // await client.connect();
    const db = client.db("travel-world");
    const destinationCollection = db.collection("destination");
    const bookingCollectios = db.collection("booking");

    // my booking
    app.get("/booking/:userId", async (req, res) => {
      const { userId } = req.params;
      const result = await bookingCollectios.find({ userId: userId }).toArray();
      res.send(result);
    });
    // booking
    app.post("/booking", varify,async (req, res) => {
      const bookingdata = req.body;

      const result = await bookingCollectios.insertOne(bookingdata);
      res.send(result);
    });

    app.get("/destination", async (req, res) => {
      const result = await destinationCollection.find().toArray();
      res.json(result);
    });
    app.post("/destination", async (req, res) => {
      const destinationData = req.body;
      console.log(destinationData, "nkzvj");
      const result = await destinationCollection.insertOne(destinationData);
      res.json(result);
    });
    // delete:
    app.delete("/booking/:bookingId", varify,async (req, res) => {
      const { bookingId } = req.params;
      const result = await bookingCollectios.deleteOne({
        _id: new ObjectId(bookingId),
      });
      res.send(result);
    });
    app.get(
      "/destination/:id",
      varify,

      async (req, res) => {
        const { id } = req.params;
        const result = await destinationCollection.findOne({
          _id: new ObjectId(id),
        });
        res.json(result);
      },
    );
    app.patch("/destination/:id", async (req, res) => {
      const id = req.params;
      const updated = req.body;
      const result = await destinationCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updated },
      );
      res.json(result);
    });
    app.delete("/destination/:id", async (req, res) => {
      const id = req.params;
      const result = await destinationCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.json(result);
    });
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("localHost running");
});
app.listen(PORT, () => {
  console.log("server running on port 5000");
});
