"use strict";
// Express Initialisation
const express = require("express");
const application = express();
const port = process.env.PORT || 8080;

// Sequelize Initialisation
const sequelize = require("./sequelize");

// Import created models
const Student = require("./models/student");
const Project = require("./models/project");
const Bug = require("./models/bug");
const { noExtendRight } = require("sequelize/dist/lib/operators");

// Define entities relationship
Student.belongsToMany(Project, {
  through: "membriProject",
  as: "StudentMembru",
});
Project.belongsToMany(Student, {
  through: "membriProject",
  as: "ProiectMembri",
});

Student.belongsToMany(Project, {
  as: "StudentTester",
  through: "testeriProject",
});
Project.belongsToMany(Student, {
  as: "ProiectTesteri",
  through: "testeriProject",
});

Project.hasMany(Bug);

Student.hasOne(Bug, { foreignKey: 'id_membru', foreignKeyConstraint: true });
Student.hasMany(Bug, { foreignKey: 'id_tester', foreignKeyConstraint: true });

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
 * POST - adaugare bug la proiect.
 */
application.post(
  "/projects/:projectId/bugs",
  async (request, response, next) => {
    try {
      const project = await Project.findByPk(request.params.projectId);
      if (project) {
        const bug = await Bug.create(request.body);
        project.addBug(bug);
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

/**
 * GET - preluarea unui anumit bug dintr-un animit proiect
 */
application.get("/projects/:projectId/bugs/:bugId", async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.projectId);
    if (project) {
      const bugs = await project.getBugs({ id: req.params.bugId });
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
        const bugs = await project.getBugs({ id: request.params.bugId });
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
        const bugs = await project.getBugs({ id: request.params.bugId });
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

//TODO - Restul

/**
 * GET - afisare bug-uri pentru un student.
 */
application.get(
  "/students/:studentId/projects/:projectId/bugs",
  async (request, response, next) => {
    try {
      const student = await Student.findByPk(request.params.studentId);
      const project = await Project.findByPk(request.params.projectId);
      if (student && project) {
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
 * POST - adaugare bug la student.
 */
application.post(
  "/students/:studentId/projects/:projectId/bugs/:bugId",
  async (request, response, next) => {
    try {
      const student = await Student.findByPk(request.params.studentId);
      const project = await Project.findByPk(request.params.projectId);
      if (student && project) {
        const bugs = await project.getBugs({ id: request.params.bugId });
        const bug = bugs.shift();
        if (bug) {
          student.addBug(bug);
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
 * GET student enrollements to Projects.
 */
 application.get(
  "/students/:studentId/membriProject",
  async (request, response, next) => {
    try {
      const student = await Student.findByPk(request.params.studentId);
      if (student) {
        const projects = await student.getProjects({ attributes: ["id"] });
        if (projects.length > 0) {
          response.json(projects);
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
 * POST to enroll a student to a Project.
 */
application.post(
  "/students/:studentId/membriProject/:projectId",
  async (request, response, next) => {
    try {
      const student = await Student.findByPk(request.params.studentId);
      const project = await Project.findByPk(request.params.projectId);
      if (student && project) {
        student.addProject(project);
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
 * GET student enrollements to Projects.
 */
application.get(
  "/students/:studentId/testeriProject",
  async (request, response, next) => {
    try {
      const student = await Student.findByPk(request.params.studentId, {
        include: [{ model: Project, as: "StudentTester" }],
      });
      if (student) {
        response.status(200).json(student.projects);
      } else {
        response.status(404).json({ message: "404 - Student Not Found!" });
      }
    } catch (err) {
      next(err);
    }
  }
);
/**
 * POST to enroll a student to a Project.
 */
application.post(
  "/students/:studentId/testeriProject/:projectId",
  async (request, response, next) => {
    try {
      const student = await Student.findByPk(request.params.studentId);
      const project = await Project.findByPk(request.params.projectId, {
        include: [{ model: Student, as: "ProiectTesteri" }],
      });
      if (student && project) {
        student.addProject(project);
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