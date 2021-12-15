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
Student.belongsToMany(Proiect, { through: "Membri-proiecte" });
Proiect.belongsToMany(Student, { through: "Membri-proiecte" });
Student.belongsToMany(Proiect, { through: "Testeri-proiecte" });
Proiect.belongsToMany(Student, { through: "Testeri-proiecte" });

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

app.listen(port, /*async*/() => {
  console.log("Serverul a pornit pe http://localhost:" + port);
  // try {
  //   await sequelize.authenticate();
  //   console.log("Conexiunea s-a realizat cu succes!");
  // } catch (error) {
  //   console.error("Nu s-a putut realiza conexiunea la baza de date: ", error);
  // }
});

// Creare middleware pentru gestionarea erorilor cu statusul 500
app.use((err, req, res, next) => {
  console.error("[EROARE]:" + err);
  res.status(500).json({ message: "500 - Eroare Server" });
});

/**
 * GET - Crearea bazei de date
 */
app.get("/creare", async (req, res, next) => {
  try {
    await sequelize.sync({ force: true });
    res.status(201).json({ message: "Baza de date a fost creata cu succes!" });
  } catch (err) {
    // next(err);
    return res.status(500).json(err); //TODO cred ca ar trb sa ramana asa peste tot
  }
});

/**
 * POST - adaugare student in baza de date
 */
app.post("/studenti", async (req, res, next) => {
  try {
    await Student.create(req.body);
    res.status(201).json({ message: "Studentul a fost creat!" });
  } catch (err) {
    // next(err);
    return res.status(500).json(err);
  }
});

/**
 * GET - preluarea tuturor studentilor
 */
app.get("/studenti", async (req, res, next) => {
  try {
    const studenti = await Student.findAll();
    res.status(200).json(studenti);
  } catch (err) {
    // next(err);
    return res.status(500).json(err);
  }
});

/**
 * GET - preluarea unui anumit student
 */
app.get("/studenti/:id", async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (student) {
      return res.status(200).json(student);
    } else {
      return res.status(404).json({ error: `Studentul cu id-ul ${req.params.id} nu a fost gasit!` });
    }
  } catch (err) {
    // next(err)
    return res.status(500).json(err);
  }
})

/**
 * DELETE - stergere student 
 */
app.delete("/studenti/:id", async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (student) {
      await student.destroy();
      return res.status(200).json({ message: `Studentul cu id-ul ${req.params.id} a fost sters!` });
    } else {
      return res.status(404).json({ error: `Studentul cu id-ul ${req.params.id} nu a fost gasit!` });
    }
  } catch (err) {
    // next(err)
    return res.status(500).json(err);
  }
})

/**
 * PUT - actualizare student
 */
app.put("/studenti/:id", async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (student) {
      await student.update(req.body);
      return res.status(200).json({ message: `Studentul cu id-ul ${req.params.id} a fost actualizat!` });
    } else {
      return res.status(404).json({ error: `Studentul cu id-ul ${req.params.id} nu a fost gasit!` });
    }
  } catch (err) {
    return res.status(500).json(err);
    // next(err)
  }
})

/**
 * POST - adaugare proiect in baza de date
 */
app.post("/proiecte", async (req, res, next) => {
  try {
    await Proiect.create(req.body);
    res.status(201).json({ message: "Proiectul a fost creat!" });
  } catch (err) {
    // next(err);
    return res.status(500).json(err);
  }
});

/**
 * GET - preluarea tuturor proiectelor
 */
app.get("/proiecte", async (req, res, next) => {
  try {
    const proiecte = await Proiect.findAll();
    res.status(200).json(proiecte);
  } catch (err) {
    // next(err);
    return res.status(500).json(err);
  }
});

/**
 * GET - preluarea unui anumit proiect
 */
app.get("/proiecte/:id", async (req, res, next) => {
  try {
    const proiect = await Proiect.findByPk(req.params.id);
    if (proiect) {
      return res.status(200).json(proiect);
    } else {
      return res.status(404).json({ error: `Proiectul cu id-ul ${req.params.id} nu a fost gasit!` });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
})

/**
 * DELETE - stergere proiect
 */
app.delete("/proiecte/:id", async (req, res, next) => {
  try {
    const proiect = await Proiect.findByPk(req.params.id);
    if (proiect) {
      await proiect.destroy();
      return res.status(200).json({ message: `Proiectul cu id-ul ${req.params.id} a fost sters!` });
    } else {
      return res.status(404).json({ error: `Proiectul cu id-ul ${req.params.id} nu a fost gasit!` });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
})

/**
 * PUT - actualizare proiect
 */
app.put("/proiecte/:id", async (req, res, next) => {
  try {
    const proiect = await Proiect.findByPk(req.params.id);
    if (proiect) {
      await proiect.update(req.body);
      return res.status(200).json({ message: `Proiectul cu id-ul ${req.params.id} a fost actualizat!` });
    } else {
      return res.status(404).json({ error: `Proiectul cu id-ul ${req.params.id} nu a fost gasit!` });
    }
  } catch (err) {
    return res.status(500).json(err);
    // next(err)
  }
})

//TODO 
// - se adauga un nou camp "ProiectIdProiect" ...
// - cand dau get all uneori nu mai contine nimic tabela.. (cred ca atunci cand fac modificari sau sterg din proiecte)
/**
 * POST - adaugare bug in baza de date
 */
app.post("/buguri", async (req, res, next) => {
  try {
    await Bug.create(req.body);
    res.status(201).json({ message: "Bug-ul a fost creat!" });
  } catch (err) {
    // next(err);
    return res.status(500).json(err);
  }
});

/**
 * GET - preluarea tuturor bug-urilor
 */
app.get("/buguri", async (req, res, next) => {
  try {
    const buguri = await Bug.findAll();
    res.status(200).json(buguri);
  } catch (err) {
    // next(err);
    return res.status(500).json(err);
  }
});

/**
 * GET - preluarea unui anumit bug
 */
app.get("/buguri/:id", async (req, res, next) => {
  try {
    const buguri = await Bug.findByPk(req.params.id);
    if (buguri) {
      return res.status(200).json(buguri);
    } else {
      return res.status(404).json({ error: `Bug-ul cu id-ul ${req.params.id} nu a fost gasit!` });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
})

/**
 * DELETE - stergere bug
 */
app.delete("/buguri/:id", async (req, res, next) => {
  try {
    const buguri = await Bug.findByPk(req.params.id);
    if (buguri) {
      await buguri.destroy();
      return res.status(200).json({ message: `Bug-ul cu id-ul ${req.params.id} a fost sters!` });
    } else {
      return res.status(404).json({ error: `Bug-ul cu id-ul ${req.params.id} nu a fost gasit!` });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
})

/**
 * PUT - actualizare bug
 */
app.put("/buguri/:id", async (req, res, next) => {
  try {
    const buguri = await Bug.findByPk(req.params.id);
    if (buguri) {
      await buguri.update(req.body);
      return res.status(200).json({ message: `Bug-ul cu id-ul ${req.params.id} a fost actualizat!` });
    } else {
      return res.status(404).json({ error: `Bug-ul cu id-ul ${req.params.id} nu a fost gasit!` });
    }
  } catch (err) {
    return res.status(500).json(err);
    // next(err)
  }
})

/**
 * POST a new member of the project to the database.
 */
//  app.post("/member", async (req, res, next) => {
//   try {
//     await Membru_proiect.create(req.body);
//     res.status(201).json({ message: "Member of the Project Created!" });
//   } catch (err) {
//     next(err);
//   }
// });

/**
 * GET aLL members of the project from the database.
 */
//  app.get("/members", async (req, res, next) => {
//   try {
//     const members_project = await Membru_proiect.findAll();
//     res.status(200).json(members_project);
//   } catch (err) {
//     next(err);
//   }
// });

/**
 * POST a new tester of the project to the database.
 */
//  app.post("/tester", async (req, res, next) => {
//   try {
//     await Tester_proiect.create(req.body);
//     res.status(201).json({ message: "Tester Created!" });
//   } catch (err) {
//     next(err);
//   }
// });

/**
 * GET aLL testers of the project from the database.
 */
//  app.get("/testers", async (req, res, next) => {
//   try {
//     const testers = await Tester_proiect.findAll();
//     res.status(200).json(testers);
//   } catch (err) {
//     next(err);
//   }
// });

//http://localhost:7000/status
