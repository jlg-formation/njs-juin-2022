import { Server } from "http";
import { Sequelize } from "sequelize";
import { NewArticle, Article } from "../interfaces/article";
import { articleDefinitions, ArticleModel } from "../models/ArticleModel";
import { AbstractService } from "./AbstractService";

export class SequelizeService extends AbstractService {
  sequelize = new Sequelize(
    process.env.MYDB_URI || "mariadb://root:admin@localhost:3306/njs2",
    {
      pool: {
        max: 15,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    }
  );

  constructor(server: Server) {
    super(server);
  }

  #init() {
    console.log("init...");
    ArticleModel.init(articleDefinitions, { sequelize: this.sequelize });
  }

  async init() {
    try {
      console.log("About to connect to DB...");
      this.server.once("close", () => {
        (async () => {
          console.log("closing sequelize...");
          await this.sequelize.close();
          console.log("sequelize closed.");
        })();
      });
      await this.sequelize.authenticate();
      console.log("Successfully connected to DB");
      this.#init();
      await this.sequelize.sync({ force: false });

      this.eventEmmitter.emit("isReady");
    } catch (err) {
      console.log("err: ", err);
    }
  }

  async createOneArticle(newArticle: NewArticle): Promise<{ id: string }> {
    try {
      console.log("create one article");
      const result = await ArticleModel.create(newArticle);
      console.log("result: ", result);
      const id = result.id;
      return { id: String(id) };
    } catch (err) {
      console.log("err: ", err);
      throw err;
    }
  }

  async deleteAllArticle(): Promise<void> {
    try {
      await ArticleModel.destroy({
        where: {},
        truncate: false,
      });
    } catch (err) {
      console.log("err: ", err);
      throw err;
    }
  }
  async deleteOneArticle(id: string): Promise<void> {
    try {
      await ArticleModel.destroy({
        where: { id: id },
      });
    } catch (err) {
      console.log("err: ", err);
      throw err;
    }
  }
  async retrieveAllArticle(): Promise<Article[]> {
    try {
      const result = await ArticleModel.findAll({
        where: {},
      });
      const articles = result.map((am) => {
        const json = am.toJSON();
        const article = { ...json, id: String(json.id) };
        return article;
      });
      return articles;
    } catch (err) {
      console.log("err: ", err);
      throw err;
    }
  }
  async retrieveOneArticle(id: string): Promise<Article | undefined> {
    try {
      const result = await ArticleModel.findByPk(id);
      console.log("result: ", result);
      if (result === null) {
        return undefined;
      }
      const json = result.toJSON();
      const article = { ...json, id: String(json.id) };
      console.log("article: ", article);
      return article as Article;
    } catch (err) {
      console.log("err: ", err);
      throw err;
    }
  }
}
