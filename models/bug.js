const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Bug = sequelize.define(
    "Bug",
    {
        id_bug: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        id_proiect: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_tst: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        severitate: {
            type: DataTypes.STRING,
            allowNull: false
        },
        prioritate_de_rezolvare: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descriere: {
            type: DataTypes.STRING,
            allowNull: false
        },
        link_commit_bug: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /^(([A-Za-z0-9]+@|http(|s)\:\/\/)|(http(|s)\:\/\/[A-Za-z0-9]+@))([A-Za-z0-9.]+(:\d+)?)(?::|\/)([\d\/\w.-]+?)(\.git){1}$/i
            }
        },
        id_membru: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true 
        },
        status_rezolvare: {
            type: DataTypes.STRING,
            allowNull: false
        },
        link_commit_rezolvare: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /^(([A-Za-z0-9]+@|http(|s)\:\/\/)|(http(|s)\:\/\/[A-Za-z0-9]+@))([A-Za-z0-9.]+(:\d+)?)(?::|\/)([\d\/\w.-]+?)(\.git){1}$/i
            }

        }
    }, { tableName: "Buguri" }
);

module.exports = Bug;