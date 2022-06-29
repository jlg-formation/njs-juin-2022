const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("mariadb://root:admin@localhost:3306/njs");

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.close();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
