const sequelize = require("../sequelize");
const { DataTypes } = require("sequelize");

const Bug = sequelize.define("bug", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  severitate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prioritate_de_rezolvare: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descriere: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  link_commit_bug: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^(([A-Za-z0-9]+@|http(|s)\:\/\/)|(http(|s)\:\/\/[A-Za-z0-9]+@))([A-Za-z0-9.]+(:\d+)?)(?::|\/)([\d\/\w.-]+?)(\.git){1}$/i,
    },
  },
  status_rezolvare: {
    //by default ar trb sa fie "Nepreluat", cand un stud il ia spre rezolvare sa se schimbe
    //si se si adauga id_membru coresunzator
    type: DataTypes.STRING,
    allowNull: false,
  },
  link_commit_rezolvare: {
    type: DataTypes.STRING,
    // allowNull: false, //initial este null, abia dupa ce se rezolva bug-ul o sa fie si link-ul
    // validate: {
    //   is: /^(([A-Za-z0-9]+@|http(|s)\:\/\/)|(http(|s)\:\/\/[A-Za-z0-9]+@))([A-Za-z0-9.]+(:\d+)?)(?::|\/)([\d\/\w.-]+?)(\.git){1}$/i,
    // },
  },
});

module.exports = Bug;
