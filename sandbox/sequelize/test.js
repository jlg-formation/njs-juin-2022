const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("mariadb://root:admin@localhost:3306/njs");

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    const User = sequelize.define(
      "User",
      {
        // Model attributes are defined here
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING,
          // allowNull defaults to true
        },
      },
      {
        // Other model options go here
      }
    );

    await sequelize.sync({ force: true });

    const jane = await User.create({ firstName: "Jane", lastName: "Doe" });
    console.log("Jane's auto-generated ID:", jane.id);

    await sequelize.close();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
