import { DataTypes, Model } from "sequelize";

export class ArticleModel extends Model {
  declare id: number;
  declare name: string;
  declare price: number;
  declare qty: number;
}

export const articleDefinitions = {
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  qty: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
};
