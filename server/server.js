require("dotenv").config();
const express = require("express");
const http = require("http");
var cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./db/connect");
const parseResponse = require("./middlewares/parseResponse");

const validateJwtToken = require("./middlewares/auth");
const { celebrate, Joi, errors, Segments } = require("celebrate");
const registerSockets = require("./sockets/index");
const insertSeeds = require("./seeds");

const app = express();

app.use(cors());

const port = process.env.SERVER_PORT || 4001;
const server = app.listen(port, () =>
  console.log(`App listening on port ${port}!`)
);

// build-in middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
const io = registerSockets(server);
app.set("io", io);

app.use(parseResponse);
app.use("/public", express.static("public"));

//public routes
require("./routes/auth")(app);
require("./routes/post")(app);

require("./routes/category")(app);
require("./routes/currency")(app);
require("./routes/posttype")(app);
require("./routes/usertype")(app);
require("./routes/attachment")(app);
require("./routes/review")(app);

//private routes
require("./routes/users")(app);

// application middlewares
app.use("*", (req, res) => {
  res.sendError({
    message: "No route found!",
    statusCode: 404,
  });
});

app.use(errors());

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await insertSeeds();
    // app.listen(port, () => console.log(`App listening on port ${port}!`));
  } catch (err) {
    console.log(err);
  }
};
start();


