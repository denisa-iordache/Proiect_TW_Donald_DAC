const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Membru_proiect = sequelize.define(
    "Membru_proiect",
    {
        id_proiect: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_student_mp: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, { tableName: "Membri_proiecte" }
);


module.exports = Membru_proiect;