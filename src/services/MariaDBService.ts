import { Article, NewArticle } from "../interfaces/article";
import mariadb, { Pool } from "mariadb";
import { Server } from "http";

export class MariaDBService {
  pool: Pool;

  constructor(private server: Server) {
    this.pool = mariadb.createPool({
      port: +(process.env.MYDB_PORT || 3306),
      host: process.env.MYDB_HOST || "localhost",
      user: process.env.MYDB_USER || "root",
      password: process.env.MYDB_PASSWORD || "admin",
      database: "njs",
      connectionLimit: 5,
    });
    console.log("this.pool: ", this.pool);

    server.once("close", () => {
      (async () => {
        console.log("closing the DB pool...");
        await this.pool.end();
        console.log("Pool closed.");
      })();
    });
  }

  async createOneArticle(article: NewArticle): Promise<{ id: string }> {
    let conn;
    try {
      conn = await this.pool.getConnection();
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
      console.log("about to release conn");
      console.log("conn: ", conn);
      await conn?.end();
      console.log("conn released.");
    }
  }

  async deleteAllArticle() {
    let conn;
    try {
      conn = await this.pool.getConnection();
      const rows = await conn.query("delete from articles");
      console.log("rows: ", rows);
      return;
    } catch (err) {
      console.log("err: ", err);
      throw err;
    } finally {
      console.log("about to release conn");
      console.log("conn: ", conn);
      await conn?.end();
      console.log("conn released.");
    }
  }

  async deleteOneArticle(id: string): Promise<void> {
    let conn;
    try {
      conn = await this.pool.getConnection();
      const rows = await conn.query("delete from articles where id = ?", [id]);
      console.log("rows: ", rows);
      return;
    } catch (err) {
      console.log("err: ", err);
      throw err;
    } finally {
      console.log("about to release conn");
      console.log("conn: ", conn);
      await conn?.end();
      console.log("conn released.");
    }
  }

  async retrieveAllArticle(): Promise<Article[]> {
    let conn;
    try {
      conn = await this.pool.getConnection();
      const rows = await conn.query("select * from articles");
      console.log("rows: ", rows);
      return (rows as Article[]).map((row) => {
        return { ...row, id: String(row.id) };
      });
    } catch (err) {
      console.log("err: ", err);
      throw err;
    } finally {
      console.log("about to release conn");
      console.log("conn: ", conn);
      await conn?.end();
      console.log("conn released.");
    }
  }

  async retrieveOneArticle(id: string): Promise<Article | undefined> {
    let conn;
    try {
      conn = await this.pool.getConnection();
      const rows = await conn.query("select * from articles where id = ?", [
        id,
      ]);
      console.log("rows: ", rows);
      const article = rows[0];
      if (article === undefined) {
        return undefined;
      }
      article.id = String(article.id);
      return article;
    } catch (err) {
      console.log("err: ", err);
      throw err;
    } finally {
      console.log("about to release conn");
      console.log("conn: ", conn);
      await conn?.end();
      console.log("conn released.");
    }
  }
}
