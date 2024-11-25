import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
    return;
  }
  console.log("Connected to the MySQL database.");
});

export const queryDatabase = (query: string, params?: object) => {
  return new Promise((resolve, reject) => {
    connection.query(query, params, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

export const execute = (query: string, params?: object) => {
  return new Promise((resolve, reject) => {
    connection.execute(query, params, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};
export default connection;
