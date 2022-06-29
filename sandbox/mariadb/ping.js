const mariadb = require("mariadb");

const pool = mariadb.createPool({
  port: process.env.MYDB_PORT || 3306,
  host: process.env.MYDB_HOST || "localhost",
  user: process.env.MYDB_USER || "root",
  password: process.env.MYDB_PASSWORD || "admin",
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
