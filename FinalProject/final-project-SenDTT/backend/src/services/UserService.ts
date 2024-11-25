import { execute, queryDatabase } from "../db";
import bcrypt from "bcryptjs";
import { ISignupBody } from "../types/authTypes";

const salt = 10;

export const getAllUsers = async () => {
  try {
    const results: any = await queryDatabase("SELECT * FROM `Users`", []);
    return results.length > 0 ? results : null;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getUserById = async (id: number) => {
  try {
    const query = "SELECT * FROM `Users` WHERE `id` = ?";
    const results: any = await queryDatabase(query, [id]);
    return results.length > 0 ? results[0] : null;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw error;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const query = "SELECT * FROM `Users` WHERE `email` = ?";
    const results: any = await queryDatabase(query, [email]);
    return results.length > 0 ? results[0] : null;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw error;
  }
};

export const addNewUser = async (data: ISignupBody) => {
  let { email, fullname, username, password } = data;
  const hash = bcrypt.hashSync(password, salt);
  if (!username) {
    username = email.split("@", 2)[0];
  }

  try {
    const query =
      "INSERT INTO `Users` (`username`, `email`, `password`, `fullname`) VALUE (?, ?, ?, ?);";
    const results: any = await execute(query, [
      username,
      email,
      hash,
      fullname,
    ]);

    if (results.insertId) {
      return await getUserById(results.insertId);
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error add user:", error);
    throw error;
  }
};
