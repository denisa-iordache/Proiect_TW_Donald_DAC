
const sequelize = require("../sequelize");
const { DataTypes } = require("sequelize");

const Student = sequelize.define(
    "Student",
    {
        id_student: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nume: {
            type: DataTypes.STRING,
            allowNull: false
        },
        prenume: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                is: /^\w+([\.-]?\w+)*@stud.ase.ro/i
            },
            unique: true
        },
        username: {
            type: DataTypes.STRING
            //TODO daca e null sa se puna automat nume+prenume maybe
        },
        parola: {
            type: DataTypes.STRING, 
            allowNull: false
        }
    }, {tableName: "Studenti"}
);

module.exports = Student;