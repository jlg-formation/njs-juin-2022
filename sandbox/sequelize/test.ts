import { Model } from "sequelize";

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("mariadb://root:admin@localhost:3306/njs");

class User extends Model {
  declare id: number;
  declare firstName: string;
  declare lastName: string;
}

User.init(
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
    sequelize, // passing the `sequelize` instance is required
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    await sequelize.sync({ force: false });

    const jane = await User.create({ firstName: "Jane", lastName: "Doe" });
    console.log("Jane's auto-generated ID:", jane.id);

    await sequelize.close();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
