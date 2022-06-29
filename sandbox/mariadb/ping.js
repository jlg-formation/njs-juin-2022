const mariadb = require("mariadb");

const pool = mariadb.createPool({
  port: 3306,
  host: "localhost",
  user: "root",
  password: "admin",
  connectionLimit: 5,
});

(async () => {
  try {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT 1 as val");
    console.log("rows: ", rows);
    await conn.end();
    await pool.end();
  } catch (err) {
    console.log("err: ", err);
  }
})();
