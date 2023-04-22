const express = require("express");
const cors = require("cors");
require("./configs/database");
const indexRouter = require("./routes/index");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/", indexRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
