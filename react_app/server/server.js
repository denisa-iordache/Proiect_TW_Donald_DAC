"use strict";
// Express Initialisation
const express = require("express");
const port = process.env.PORT || 8080;
const application = express();

const cors = require("cors");
application.use(express.json());
application.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);

const bcrypt = require("bcrypt");
const saltRounds = 10;

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

application.use(cookieParser());
application.use(bodyParser.urlencoded({ extended: true }));
application.use(
  session({
    key: "userId",
    secret: "terces",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24, //corespunde cu 24h
    },
  })
);

const jwt = require("jsonwebtoken"); //o sa folosim tokenul pt fiecare request facut de user pe site

// Sequelize Initialisation
const sequelize = require("./sequelize");

// Import created models
const Student = require("./models/student");
const Project = require("./models/project");
const Bug = require("./models/bug");
const { noExtendRight } = require("sequelize/dist/lib/operators");
const { urlencoded } = require("body-parser");

// Define entities relationship
Project.hasMany(Bug, { foreignKey: "id_proiect" }); // in bug se adauga id_proiect

Student.belongsToMany(Project, {
  as: "StudentMembru", //"membru",
  through: "membriProject",
  foreignKey: "id_student",
});
Project.belongsToMany(Student, {
  as: "ProiectMembri", //"membru",
  through: "membriProject",
  foreignKey: "id_proiect",
});

Student.belongsToMany(Project, {
  as: "StudentTester",
  through: "testeriProject",
  foreignKey: "id_student",
});
Project.belongsToMany(Student, {
  as: "ProiectTesteri",
  through: "testeriProject",
  foreignKey: "id_proiect",
});

Student.hasMany(Bug, { as: "StdMp", foreignKey: "id_membru" }); // si membrul de proiect are mai multe bug-uri, validarea trebuie facuta din front ca el sa aiba un singur bug spre rezolvare la un moment dat
Student.hasMany(Bug, { as: "StdTst", foreignKey: "id_tester" });

// Express middleware
application.use(
  express.urlencoded({
    extended: true,
  })
);
application.use(express.json());

// Kickstart the Express aplication
application.listen(port, () => {
  console.log(`The server is running on http://localhost: ${port}.`);
});

// Create a middleware to handle 500 status errors.
application.use((error, request, response, next) => {
  console.error(`[ERROR]: ${error}`);
  response.status(500).json(error);
});

/**
 * Create a special GET endpoint so that when it is called it will
 * sync our database with the models.
 */
application.put("/", async (request, response, next) => {
  try {
    await sequelize.sync({ force: true });
    response.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

/**
 * GET - afisare lista studenti.
 */
application.get("/students", async (request, response, next) => {
  try {
    const students = await Student.findAll();
    if (students.length > 0) {
      response.json(students);
    } else {
      response.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
});

/**
 * POST - adaugare student in baza de date
 */
application.post("/students", async (request, response, next) => {
  try {
    const student = await Student.create(request.body);
    response.status(201).location(student.id).send();
  } catch (error) {
    next(error);
  }
});

/**
 * POST - adaugare student in baza de date - REGISTER
 */
application.post("/studentsregister", async (request, response, next) => {
  try {
    bcrypt.hash(request.body.parola, saltRounds, async (err, hash) => {
      const student = await Student.create({
        nume: request.body.nume,
        prenume: request.body.prenume,
        email: request.body.email,
        username: request.body.username,
        parola: hash,
      });
      response.send({ message: "Utilizator inregistrat cu succes!" });
      //response.status(201).location(student.id).send();
    });
  } catch (error) {
    response.send({ message: "Inregistrarea nu s-a putut realiza cu succes!" });
    next(error);
  }
});

/**
 * GET - afisarea unui anumit student
 */
application.get("/students/:studentId", async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.studentId);
    if (student) {
      return res.status(200).json(student);
    } else {
      return res.status(404).json({
        error: `Studentul cu id-ul ${req.params.studentId} nu a fost gasit!`,
      });
    }
  } catch (err) {
    // next(err)
    return res.status(500).json(err);
  }
});

const verificareJWT = (req, res, next) => {
  const token = req.header("x-access-token");
  if (!token) {
    res.send("Avem nevoie de un token.");
  } else {
    jwt.verify(token, "tercestwj", (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "Autentificarea a esuat!" });
      } else {
        req.id = decoded.id;
        next();
      }
    });
  }
};

//GET - verificare autentificare
application.get("/studentAuth", verificareJWT, async (req, res, next) => {
  res.send("Te-ai autentificat cu succes!");
});

/**
 * GET - Verificare logare
 */
application.get("/studentslogin", async (req, res, next) => {
  try {
    if (req.session.student) {
      res.send({ loggedIn: true, student: req.session.student });
    } else {
      res.send({ loggedIn: false });
    }
  } catch (err) {
    // next(err)
    return res.status(500).json(err);
  }
});

application.get("/studentslog", async (req, res, next) => {
  try {
    if (req.session.student) {
      const prenume = req.session.student.prenume;
      res.json({prenume:prenume})
    }
  } catch (err) {
    // next(err)
    return res.status(500).json(err);
  }
});

/**
 * POST - Gasirea in baza de date a unui student - LOGIN
 */
application.post("/studentslogin", async (req, res, next) => {
  try {
    const student = await Student.findOne({
      where: { username: req.body.username },
    });
    if (student) {
      bcrypt.compare(req.body.parola, student.parola, (error, response) => {
        if (response) {
          const id = student.id;
          const token = jwt.sign({ id }, "tercestwj", {
            expiresIn: 300, //corespunde cu 5 min
          });
          req.session.student = student;
          res.json({ auth: true, token: token, result: student }); //cand te loghezi in cont se creeaza un token
          //return res.status(200).json(student);
        } else {
          res.json({
            auth: false,
            message: "Nume de utilizator sau prola gresita!",
          });
          // return res.status(404).json({
          //   error: `Studentul cu numele ${req.body.username} nu a fost gasit!`,
          // });
        }
      });
    } else {
      res.json({ auth: false, message: "Utilizatorul nu exista" });
    }
  } catch (err) {
    // next(err)
    return res.status(500).json(err);
  }
});

/**
 * DELETE - stergere student
 */
application.delete("/students/:studentId", async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.studentId);
    if (student) {
      await student.destroy();
      return res.status(200).json({
        message: `Studentul cu id-ul ${req.params.studentId} a fost sters!`,
      });
    } else {
      return res.status(404).json({
        error: `Studentul cu id-ul ${req.params.studentId} nu a fost gasit!`,
      });
    }
  } catch (err) {
    // next(err)
    return res.status(500).json(err);
  }
});

/**
 * PUT - actualizare student
 */
application.put("/students/:studentId", async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.studentId);
    if (student) {
      await student.update(req.body);
      return res.status(200).json({
        message: `Studentul cu id-ul ${req.params.studentId} a fost actualizat!`,
      });
    } else {
      return res.status(404).json({
        error: `Studentul cu id-ul ${req.params.studentId} nu a fost gasit!`,
      });
    }
  } catch (err) {
    return res.status(500).json(err);
    // next(err)
  }
});

/**
 * GET - afisarea tuturor proiectelor
 */
application.get("/projects", async (request, response, next) => {
  try {
    const projects = await Project.findAll();
    if (projects.length > 0) {
      response.json(projects);
    } else {
      response.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
});

/**
 * POST - adaugare proiect in baza de date
 */
application.post("/projects", async (request, response, next) => {
  try {
    const project = await Project.create(request.body);
    response.status(201).location(project.id).send();
  } catch (error) {
    next(error);
  }
});

/**
 * POST - adaugare proiect in baza de date
 */
application.post("/projectsFront", async (request, response, next) => {
  try {
    if (request.session.student) {
      const proiect = await Project.create({
        id_autor: request.session.student.id,
        nume_proiect: request.body.nume_proiect,
        status_proiect: request.body.status_proiect,
        link_repository: request.body.link_repository,
      });
      response.send({ message: "Proiect inregistrat cu succes!" });
    }
  } catch (error) {
    response.send({ message: "Inregistrarea nu s-a putut realiza cu succes!" });
    next(error);
  }
});

/**
 * GET - afisarea proiectelor pentru un student
 */
application.get("/projectsFront", async (request, response, next) => {
  try {
    if (request.session.student) {
      const projects = await Project.findAll({
        where: {
          id_autor: request.session.student.id,
        },
      });
      // if (projects.length > 0) {
        response.json(projects);
      // } else {
      //   response.sendStatus(204);
      // }
    }
  } catch (error) {
    next(error);
  }
});

/**
 * GET - afisarea unui anumit proiect
 */
application.get("/projects/:projectId", async (req, res, next) => {
  try {
    const proiect = await Project.findByPk(req.params.projectId);
    if (proiect) {
      return res.status(200).json(proiect);
    } else {
      return res.status(404).json({
        error: `Proiectul cu id-ul ${req.params.projectId} nu a fost gasit!`,
      });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

/**
 * DELETE - stergere proiect
 */
application.delete("/projects/:projectId", async (req, res, next) => {
  try {
    const proiect = await Project.findByPk(req.params.projectId);
    if (proiect) {
      await proiect.destroy();
      return res.status(200).json({
        message: `Proiectul cu id-ul ${req.params.projectId} a fost sters!`,
      });
    } else {
      return res.status(404).json({
        error: `Proiectul cu id-ul ${req.params.projectId} nu a fost gasit!`,
      });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

/**
 * PUT - actualizare proiect
 */
application.put("/projects/:projectId", async (req, res, next) => {
  try {
    const proiect = await Project.findByPk(req.params.projectId);
    if (proiect) {
      await proiect.update(req.body);
      return res.status(200).json({
        message: `Proiectul cu id-ul ${req.params.projectId} a fost actualizat!`,
      });
    } else {
      return res.status(404).json({
        error: `Proiectul cu id-ul ${req.params.projectId} nu a fost gasit!`,
      });
    }
  } catch (err) {
    return res.status(500).json(err);
    // next(err)
  }
});

/**
 * GET - afisare bug-uri pentru un proiect specificat.
 */
application.get(
  "/projects/:projectId/bugs",
  async (request, response, next) => {
    try {
      const project = await Project.findByPk(request.params.projectId);
      if (project) {
        const bugs = await project.getBugs();
        if (bugs.length > 0) {
          response.json(bugs);
        } else {
          response.sendStatus(204);
        }
      } else {
        response.sendStatus(404);
      }
    } catch (error) {
      next(error);
    }
  }
);

/**
 * POST - testerul adauga un bug la un anumit proiect.
 */
application.post(
  "/studentsTST/:studentId/projects/:projectId/bugs",
  async (request, response, next) => {
    try {
      const student = await Student.findByPk(request.params.studentId);
      const project = await Project.findByPk(request.params.projectId);
      if (project) {
        const bug = await Bug.create(request.body);
        student.addStdTst(bug);
        project.addBug(bug);
        await student.save();
        await project.save();
        response.status(201).location(bug.id).send();
      } else {
        response.sendStatus(404);
      }
    } catch (error) {
      next(error);
    }
  }
);

application.post(
  "/bugs",
  async (request, response, next) => {
    try {
      if (request.session.student) {
      const student = await Student.findByPk(request.session.student.id);
      const project = await Project.findOne({where: { nume_proiect: request.body.nume_proiect },});
      if (project) {
        const bug = await Bug.create({
          severitate: request.body.severitate,
          prioritate_de_rezolvare: request.body.prioritate_de_rezolvare,
          descriere: request.body.descriere,
          link_commit_bug: request.body.link_commit_bug,
          status_rezolvare: request.body.status_rezolvare,
          link_commit_rezolvare:request.body.link_commit_rezolvare,
        });
        student.addStdTst(bug);
        project.addBug(bug);
        await student.save();
        await project.save();
        //response.status(201).location(bug.id).send();
        response.send({ message: "Bug inregistrat cu succes!" });
      } else {
        //response.sendStatus(404);
        response.send({ message: "Inregistrarea nu s-a putut realiza cu succes!" });
      }
    }} catch (error) {
      next(error);
      response.send({ message: "Inregistrarea nu s-a putut realiza cu succes!" });
    }
  }
);

// /**
//  * POST - adaugare bug la proiect.
//  */
// application.post(
//   "/projects/:projectId/bugs",
//   async (request, response, next) => {
//     try {
//       const project = await Project.findByPk(request.params.projectId);
//       if (project) {
//         const bug = await Bug.create(request.body);
//         project.addBug(bug);
//         await project.save();
//         response.status(201).location(bug.id).send();
//       } else {
//         response.sendStatus(404);
//       }
//     } catch (error) {
//       next(error);
//     }
//   }
// );

/**
 * GET - preluarea unui anumit bug dintr-un anumit proiect
 */
application.get("/projects/:projectId/bugs/:bugId", async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.projectId);
    if (project) {
      const bugs = await project.getBugs({ where: { id: req.params.bugId } }); // where ca altfel il ia mereu pe primul
      const bug = bugs.shift();
      if (bug) {
        return res.status(200).json(bug);
      } else {
        response.sendStatus(404);
      }
    } else {
      return res.status(404).json({
        error: `Bug-ul cu id-ul ${req.params.bugId} nu a fost gasit!`,
      });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

/**
 * DELETE - stergere bug de la proiect.
 */
application.delete(
  "/projects/:projectId/bugs/:bugId",
  async (request, response, next) => {
    try {
      const project = await Project.findByPk(request.params.projectId);
      if (project) {
        const bugs = await project.getBugs({
          where: { id: request.params.bugId },
        });
        const bug = bugs.shift();
        if (bug) {
          await bug.destroy();
          response.sendStatus(204);
        } else {
          response.sendStatus(404);
        }
      } else {
        response.sendStatus(404);
      }
    } catch (error) {
      next(error);
    }
  }
);

/**
 * PUT - actualizare bug dintr-un proiect specificat
 */
application.put(
  "/projects/:projectId/bugs/:bugId",
  async (request, res, next) => {
    try {
      const project = await Project.findByPk(request.params.projectId);
      if (project) {
        const bugs = await project.getBugs({
          where: { id: request.params.bugId },
        });
        const bug = bugs.shift();
        if (bug) {
          await bug.update(request.body);
          res.status(200).json({
            message: `Bug-ul cu id-ul ${request.params.bugId} a fost actualizat!`,
          });
        } else {
          res.status(404).json({
            error: `Bug-ul cu id-ul ${request.params.bugId} nu a fost gasit!`,
          });
        }
      } else {
        response.sendStatus(404);
      }
    } catch (err) {
      return res.status(500).json(err);
      // next(err)
    }
  }
);

/**
 * POST - Adauga bug la student membru
 */
application.post(
  "/studentsMP/:studentId/bugs/:bugId",
  async (request, response, next) => {
    try {
      const student = await Student.findByPk(request.params.studentId);
      if (student) {
        const bug = await Bug.findByPk(request.params.bugId);
        if (bug) {
          student.addStdMp(bug); // student.addBug is not a function
          student.save();
          response.sendStatus(204);
        } else {
          response.sendStatus(404);
        }
      } else {
        response.sendStatus(404);
      }
    } catch (error) {
      next(error);
    }
  }
);

/**
 * GET - Preia bug-urile unui membru
 */
application.get(
  "/studentsMP/:studentId/bugs",
  async (request, response, next) => {
    try {
      const student = await Student.findByPk(request.params.studentId, {
        include: "StdMp", //[{ model: Project, as: "StudentMembru" }]
      });
      if (student) {
        const bugs = await student.getStdMp(/*{ attributes: ["id"] }*/);
        if (bugs.length > 0) {
          response.json(bugs);
        } else {
          response.sendStatus(204).json({ message: "No bug found." });
        }
      } else {
        response.status(404).json({ message: "404 - Student Not Found!" });
      }
    } catch (error) {
      next(error);
    }
  }
);

// /**
//  * POST - Adauga bug la student tester
//  */
// application.post(
//   "/studentsTST/:studentId/bugs/:bugId",
//   async (request, response, next) => {
//     try {
//       const student = await Student.findByPk(request.params.studentId);
//       if (student) {
//         const bug = await Bug.findByPk(request.params.bugId);
//         if (bug) {
//           student.addStdTst(bug); // student.addBug is not a function
//           student.save();
//           response.sendStatus(204);
//         } else {
//           response.sendStatus(404);
//         }
//       } else {
//         response.sendStatus(404);
//       }
//     } catch (error) {
//       next(error);
//     }
//   }
// );

/**
 * GET - Preia bug-urile unui tester
 */
application.get(
  "/studentsTST/:studentId/bugs",
  async (request, response, next) => {
    try {
      const student = await Student.findByPk(request.params.studentId, {
        include: "StdTst", //[{ model: Project, as: "StudentMembru" }]
      });
      if (student) {
        const bugs = await student.getStdTst(/*{ attributes: ["id"] }*/);
        if (bugs.length > 0) {
          response.json(bugs);
        } else {
          response.sendStatus(204).json({ message: "No bug found." });
        }
      } else {
        response.status(404).json({ message: "404 - Student Not Found!" });
      }
    } catch (error) {
      next(error);
    }
  }
);

/**
 * GET - preluarea tuturor proiectelor pentru un anumit MP
 */
application.get(
  "/students/:studentId/membriProject",
  async (request, response, next) => {
    try {
      const student = await Student.findByPk(request.params.studentId, {
        include: "StudentMembru", //[{ model: Project, as: "StudentMembru" }]
      });
      if (student) {
        const projects =
          await student.getStudentMembru(/*{ attributes: ["id"] }*/);
        if (projects.length > 0) {
          response.json(projects);
        } else {
          response.sendStatus(204).json({ message: "No project found." });
        }
      } else {
        response.status(404).json({ message: "404 - Student Not Found!" });
      }
    } catch (error) {
      next(error);
    }
  }
);

/**
 * GET - preluarea tuturor membrilor dintr-un anumit proiect
 */
application.get(
  "/projects/:projectId/students",
  async (request, response, next) => {
    try {
      const project = await Project.findByPk(request.params.projectId, {
        include: "ProiectMembri",
      });
      if (project) {
        const students =
          await project.getProiectMembri(/*{ attributes: ["id"] }*/);
        if (students.length > 0) {
          response.json(students);
        } /*else {
          response.sendStatus(204).json({ message: "No student found." });
        }*/
      } else {
        response.status(404).json({ message: "404 - Project Not Found!" });
      }
    } catch (error) {
      next(error);
    }
  }
);

/**
 * POST - adaugarea unui membru la un anumit proiect
 */
application.post(
  "/students/:studentId/membriProject/:projectId",
  async (request, response, next) => {
    try {
      const student = await Student.findByPk(request.params.studentId);
      const project = await Project.findByPk(request.params.projectId, {
        include: "ProiectMembri", //[{ model: Student, as: "ProiectMembri"/*"membru"*/ }]
      });
      if (student && project) {
        student.addStudentMembru(project); //asa merge, adauga studentii in membriProject
        student.save();
        response.sendStatus(204);
      } else {
        response.sendStatus(404);
      }
    } catch (error) {
      next(error);
    }
  }
);

/**
 * GET - preluarea tuturor proiectelor pentru un anumit TST
 */
application.get(
  "/students/:studentId/testeriProject",
  async (request, response, next) => {
    try {
      const student = await Student.findByPk(request.params.studentId, {
        include: "StudentTester", //[{ model: Project, as: "StudentTester" }],
      });
      if (student) {
        const projects = await student.getStudentTester();
        if (projects.length > 0) {
          response.json(projects);
        } else {
          response.sendStatus(204).json({ message: "No project found." });
        }
      } else {
        response.status(404).json({ message: "404 - Student Not Found!" });
      }
    } catch (err) {
      next(err);
    }
  }
);

/**
 * GET - preluarea tuturor testerilor dintr-un anumit proiect
 */
application.get(
  "/projects/:projectId/studentstst",
  async (request, response, next) => {
    try {
      const project = await Project.findByPk(request.params.projectId, {
        include: "ProiectTesteri",
      });
      if (project) {
        const students =
          await project.getProiectTesteri(/*{ attributes: ["id"] }*/);
        if (students.length > 0) {
          response.json(students);
        } /*else {
          response.sendStatus(204).json({ message: "No student found." });
        }*/
      } else {
        response.status(404).json({ message: "404 - Project Not Found!" });
      }
    } catch (error) {
      next(error);
    }
  }
);

/**
 * POST - adaugarea unui tester la un anumit proiect
 */
application.post(
  "/students/:studentId/testeriProject/:projectId",
  async (request, response, next) => {
    try {
      const student = await Student.findByPk(request.params.studentId);
      const project = await Project.findByPk(request.params.projectId, {
        include: "ProiectTesteri", //[{ model: Student, as: "ProiectTesteri" }],
      });
      if (student && project) {
        student.addStudentTester(project); // adauga studentul in testeriProject
        await student.save();
        response.sendStatus(204);
      } else {
        response.sendStatus(404);
      }
    } catch (error) {
      next(error);
    }
  }
);

//server:
//npm install cors
//npm install bcrypt
//npm install express-session body-parser cookie-parser
//npm install jsonwebtoken

//client:
//npm install axios
