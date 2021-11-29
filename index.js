"use strict";

const express = require("express");
const statusRouter=require("./routes/status");

const app = express();
app.use("/status",statusRouter)
app.set("port", process.env.PORT || 7000);

app.listen(app.get("port"), () => {
  console.log(`Serverul a pornit pe http://localhost:${app.get("port")}`);
});

//http://localhost:7000/status