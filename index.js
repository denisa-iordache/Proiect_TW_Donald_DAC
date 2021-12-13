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
const Membru_proiect = require("./models/membru_proiect");
const Tester_proiect = require("./models/tester_proiect");
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

/**
 * POST a new project to the database.
 */
 app.post("/project", async (req, res, next) => {
  try {
    await Proiect.create(req.body);
    res.status(201).json({ message: "Project Created!" });
  } catch (err) {
    next(err);
  }
});

/**
 * GET aLL projects from the database.
 */
 app.get("/projects", async (req, res, next) => {
  try {
    const projects = await Proiect.findAll();
    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
});

/**
 * POST a new member of the project to the database.
 */
 app.post("/member", async (req, res, next) => {
  try {
    await Membru_proiect.create(req.body);
    res.status(201).json({ message: "Member of the Project Created!" });
  } catch (err) {
    next(err);
  }
});

/**
 * GET aLL members of the project from the database.
 */
 app.get("/members", async (req, res, next) => {
  try {
    const members_project = await Membru_proiect.findAll();
    res.status(200).json(members_project);
  } catch (err) {
    next(err);
  }
});

/**
 * POST a new tester of the project to the database.
 */
 app.post("/tester", async (req, res, next) => {
  try {
    await Tester_proiect.create(req.body);
    res.status(201).json({ message: "Tester Created!" });
  } catch (err) {
    next(err);
  }
});

/**
 * GET aLL testers of the project from the database.
 */
 app.get("/testers", async (req, res, next) => {
  try {
    const testers = await Tester_proiect.findAll();
    res.status(200).json(testers);
  } catch (err) {
    next(err);
  }
});

/**
 * POST a new bug to the database.
 */
 app.post("/bug", async (req, res, next) => {
  try {
    await Bug.create(req.body);
    res.status(201).json({ message: "Bug Created!" });
  } catch (err) {
    next(err);
  }
});

/**
 * GET aLL bugs from the database.
 */
 app.get("/bugs", async (req, res, next) => {
  try {
    const bugs = await Bug.findAll();
    res.status(200).json(bugs);
  } catch (err) {
    next(err);
  }
});

//http://localhost:7000/status
