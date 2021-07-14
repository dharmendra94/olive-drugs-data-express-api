const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const HttpException = require("./utils/HttpException.utils");
const errorMiddleWare = require("./middleware/error.middleware");
const drugInfoRouter = require("./routes/nadac.route");

// Initialize express
const app = express();


// Initialize environment
dotenv.config();


// Parse requests of content-type: application/json
app.use(express.json());

// enabling cors for all requests using cors middleware
app.use(cors());

// Enable pre-flight
app.options("*", cors());

const port = Number(process.env.PORT);

app.use("/api", drugInfoRouter);

app.get("/", (req, res) => {
    res.send("Node app is running and DB host: " + process.env.DB_HOST + process.env.DB_USER + process.env.DB_PASS + process.env.DB_DATABASE);
});

app.all("*", (req, res, next) => {
    const err = new HttpException(404)
    next(err);
})

// Error middleware
app.use(errorMiddleWare);


// starting the server
app.listen(port, () => console.log("Server running on port" + port));

module.exports = app;
