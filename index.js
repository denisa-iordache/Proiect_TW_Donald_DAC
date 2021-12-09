"use strict";

const express = require("express");
// const statusRouter = require("./routes/status");
const app = express();
const port = 7000;

const sequelize = require("./sequelize");

// Import tabele
const Proiect = require("./models/proiect");
const Student = require("./models/student");
const Bug = require("./models/bug");
// const Membru_proiect = require("./models/membru_proiect");
// const Tester_proiect = require("./models/tester_proiect");

// require("./models/student"); 

// const app = express();
// app.use("/status", statusRouter);
// app.set("port", 7000);

// Definire legaturi tabele
// Student.belongsToMany(Proiect, { through: Membru_proiect, Tester_proiect });
// Proiect.belongsToMany(Student, { through: Membru_proiect, Tester_proiect });
Student.belongsToMany(Proiect,{through: "Membri-proiecte"});
Proiect.belongsToMany(Student,{through: "Membri-proiecte"});
Student.belongsToMany(Proiect,{through: "Testeri-proiecte"});
Proiect.belongsToMany(Student,{through: "Testeri-proiecte"});

Proiect.hasMany(Bug);
//Student.hasMany(Bug);
//Student.hasOne(Bug); 

Student.hasOne(Bug, { foreignKey: 'id_membru', foreignKeyConstraint: true });
Student.hasMany(Bug, { foreignKey: 'id_tst', foreignKeyConstraint: true });

// Express middleware
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.listen(port, /*async*/ () => {
  console.log("Serverul a pornit pe http://localhost:" + port);
  // try {
  //   await sequelize.authenticate();
  //   console.log("Conexiunea s-a realizat cu succes!");
  // } catch (error) {
  //   console.error("Nu s-a putut realiza conexiunea la baza de date: ", error);
  // }
});

// Create a middleware to handle 500 status errors.
app.use((err, req, res, next) => {
  console.error("[ERROR]:" + err);
  res.status(500).json({ message: "500 - Server Error" });
});

app.get("/create", async (req, res, next) => {
  try {
    await sequelize.sync({ force: true });
    res.status(201).json({ message: "Database created with the models." });
  } catch (err) {
    next(err);
  }
});

/**
 * POST a new student to the database.
 */
app.post("/student", async (req, res, next) => {
  try {
    await Student.create(req.body);
    res.status(201).json({ message: "Student Created!" });
  } catch (err) {
    next(err);
  }
});

/**
 * GET aLL students from the database.
 */
app.get("/students", async (req, res, next) => {
  try {
    const students = await Student.findAll();
    res.status(200).json(students);
  } catch (err) {
    next(err);
  }
});

//http://localhost:7000/status