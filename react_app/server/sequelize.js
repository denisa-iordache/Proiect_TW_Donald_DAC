const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./sqlite/bug_tracking.db",
  define: {
    timestamps: false,
  },
});

module.exports = sequelize;
