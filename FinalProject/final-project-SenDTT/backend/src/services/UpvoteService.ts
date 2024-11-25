import { execute, queryDatabase } from "../db";
import { IUpvoteForm } from "../types/upvoteTypes";

export const addUpvote = async ({
  type,
  associate_id,
  user_id,
}: IUpvoteForm) => {
  const query =
    "INSERT INTO `Upvotes` (`type`, `associate_id`, `user_id`) VALUES (?, ?, ?)";
  const result: any = await execute(query, [type, associate_id, user_id]);

  return result.insertId ?? null;
};

export const removeUpvote = async (
  type: "policy" | "reply",
  userId: number,
  associate_id: number
) => {
  const query =
    "DELETE FROM `Upvotes` WHERE `user_id` = ? AND `associate_id` = ? AND type = ?";
  return await execute(query, [userId, associate_id, type]);
};

export const getUpvoteById = async (id: number) => {
  const query = "SELECT * FROM `Upvotes` WHERE `id` = ?";
  const result: any = await queryDatabase(query, [id]);

  return result.length > 0 ? result[0] : null;
};

export const getUpvoteByUserId = async (
  type: "policy" | "reply",
  userId: number,
  associate_id: number
) => {
  const query =
    "SELECT * FROM `Upvotes` WHERE `user_id` = ? AND `associate_id` = ? AND type = ?";
  const result: any = await queryDatabase(query, [userId, associate_id, type]);

  return result.length > 0 ? result[0] : null;
};
