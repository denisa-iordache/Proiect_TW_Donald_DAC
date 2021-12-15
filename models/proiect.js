const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Proiect = sequelize.define(
    "Proiect",
    {
        id_proiect: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        id_student_autor: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        nume_proiect: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status_proiect: {
            type: DataTypes.STRING,
            allowNull: false
        },
        link_repository: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /^(([A-Za-z0-9]+@|http(|s)\:\/\/)|(http(|s)\:\/\/[A-Za-z0-9]+@))([A-Za-z0-9.]+(:\d+)?)(?::|\/)([\d\/\w.-]+?)(\.git){1}$/i
            }
        }
    }, { tableName: "Proiecte" }
);


module.exports = Proiect;