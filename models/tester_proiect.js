const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Tester_proiect = sequelize.define(
    "Tester_proiect",
    {
        id_proiect: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_student_tst: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, { tableName: "Testeri_proiecte" }
);

module.exports = Tester_proiect;