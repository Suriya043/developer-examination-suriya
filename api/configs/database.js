const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://api_recruit:As4TapTe768DOS68@recruitment.mos8yva.mongodb.net/developer_exam", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));
