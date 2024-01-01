const express = require("express");
const cors = require("cors");

const app = express();

// parse requests of content-type - application/json
app.use(cors());
app.use(express.json());
// Connecting to the MongoDb database
require("./db/dbConnect")();

// routes
const stopsRoute = require("./routes/stops.route");
const lignesRoute = require("./routes/lignes.route");
const userRoute = require("./routes/user.route");
const homeRoute = require("./routes/home.route");
const cleanRoute = require("./routes/cleanCollection.route");

//api
app.use("/", userRoute);
app.use("/", stopsRoute);
app.use("/", lignesRoute);
app.use("/", homeRoute);
// Use the cleanCollection route
app.use("/", cleanRoute);
//set port, listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
