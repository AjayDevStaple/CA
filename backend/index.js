const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const adminRoute = require("./routes/admin");
const showBanner = require("node-banner");
const path = require("path");



dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () => {
  console.log("Database is connected");
});




//middlewear
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));


app.use(cors({
  origin : '*'
}));

app.use(fileUpload());

app.use("/api/user", userRoute);

app.use("/api/auth", authRoute);

app.use("/api/admin", adminRoute);



(async () => {
  await showBanner("CA-BACKEND", "A Product of Staple Logic");
})();

app.listen(process.env.PORT, () => {
  console.log("");
  
console.log(__dirname)
});
