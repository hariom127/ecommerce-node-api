const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect("mongodb://localhost:27017/flipkart", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      user: "dbAdmin",
      pass: "password",
    })
    .then((con) => {
      console.log(`DB connected with host: ${con.connection.host}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDatabase;
