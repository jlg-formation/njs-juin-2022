import { Article, NewArticle } from "../interfaces/article";
import mariadb from "mariadb";

const pool = mariadb.createPool({
  port: +(process.env.MYDB_PORT || 3306),
  host: process.env.MYDB_HOST || "localhost",
  user: process.env.MYDB_USER || "root",
  password: process.env.MYDB_PASSWORD || "admin",
  database: "njs",
  connectionLimit: 5,
});

export class MariaDBService {
  async createOneArticle(article: NewArticle): Promise<{ id: string }> {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query(
        "insert into articles (name, price, qty) values (?, ?, ?)",
        [article.name, article.price, article.qty]
      );
      console.log("rows: ", rows);
      const insertId = rows.insertId;
      console.log("insertId: ", insertId, typeof insertId);
      const id = String(insertId);
      console.log("id: ", id);
      return { id };
    } catch (err) {
      console.log("err: ", err);
      throw err;
    } finally {
      await conn?.end();
    }
  }

  async retrieveAllArticle(): Promise<Article[]> {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query("select * from articles");
      console.log("rows: ", rows);
      return [];
    } catch (err) {
      console.log("err: ", err);
      throw err;
    } finally {
      await conn?.end();
    }
  }

  async retrieveOneArticle(id: string): Promise<Article | undefined> {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query("select * from articles where id = ?", [
        id,
      ]);
      console.log("rows: ", rows);
      const article = rows[0];
      article.id = String(article.id);
      return article;
    } catch (err) {
      console.log("err: ", err);
      throw err;
    } finally {
      await conn?.end();
    }
  }
}
