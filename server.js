const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler")
const connectDb = require("./config/dbConnection");

const port = process.env.PORT || 3000;


const app = express();
connectDb()

app.use(express.json());
const contactsRoute = require("./routes/contactRoutes");
const userRoute = require("./routes/userRoutes");

app.use(contactsRoute);
app.use(userRoute)

app.use(errorHandler);

app.listen(port, () => console.log("Server started Running!"));