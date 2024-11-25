import { execute, queryDatabase } from "../db";
import { IGetListQueries } from "../types/common";
import { IPolicy, IPolicyForm } from "../types/policyTypes";
import { renderColor } from "./CategogyService";
const selectQuery = `SELECT 
      Policies.id AS policy_id,
      Policies.title AS policy_title,
      Policies.body AS policy_body,
      Policies.createdAt AS policy_createdAt,
      Policies.updatedAt AS policy_updatedAt,

      Categories.id AS category_id,
      Categories.name AS category_name,
      Categories.description AS category_description,
      Categories.createdAt AS category_createdAt,
      Categories.updatedAt AS category_updatedAt,

      Users.id AS owner_id,
      Users.username AS owner_username,
      Users.email AS owner_email,
      Users.password AS owner_password,
      Users.fullname AS owner_fullname,
      Users.createdAt AS owner_createdAt,
      Users.updatedAt AS owner_updatedAt,
      COUNT(Upvotes.id) as votes
    `;
const joinTables = ` FROM Policies
    JOIN Categories ON Policies.category_id = Categories.id
    JOIN Users ON Policies.owner_id = Users.id
    LEFT JOIN Upvotes ON Upvotes.associate_id = Policies.id AND Upvotes.type = 'policy'`;
const checkCurrentUserVotes = `, MAX(CASE 
        WHEN Upvotes.user_id = ? THEN 1 -- Check if current user voted
        ELSE 0 
    END) AS isVoted`;
const groupBy = ` GROUP BY 
    Policies.id,
    Categories.id,
    Users.id`;

export const getPolicies = ({
  limit,
  offset,
  search,
  year,
  category,
  userId,
}: IGetListQueries & { userId?: number }) => {
  const whereCategory = ` Policies.category_id = ${category} AND `;
  const limitAndOffset =
    " YEAR(`Policies`.`createdAt`) = " +
    year +
    groupBy +
    " LIMIT " +
    limit +
    " OFFSET " +
    offset;
  let limitedQuery =
    selectQuery +
    (userId ? checkCurrentUserVotes : "") +
    joinTables +
    " WHERE " +
    (category ? whereCategory : "") +
    limitAndOffset;
  const countQuery = "SELECT COUNT(*) AS total_count FROM Policies";

  if (search !== "") {
    limitedQuery =
      selectQuery +
      (userId ? checkCurrentUserVotes : "") +
      joinTables +
      " WHERE " +
      (category ? whereCategory : "") +
      "`Policies`.`title` like ? AND " +
      limitAndOffset;
  }
  console.log(limitedQuery);
  let params: any = [];
  if (userId) {
    params = [userId];
  }
  if (search !== "") {
    params.push(`%${search}%`);
  }

  return Promise.all([
    queryDatabase(limitedQuery, params),
    queryDatabase(countQuery),
  ])
    .then(([rows, countResult]) => {
      const data: IPolicy[] =
        rows && Array.isArray(rows)
          ? rows.map((row) => {
              return {
                id: row.policy_id,
                title: row.policy_title,
                category: {
                  id: row.category_id,
                  name: row.category_name,
                  color: renderColor(row.category_id!),
                  description: row.category_description,
                  createdAt: row.category_createdAt,
                  updatedAt: row.category_updatedAt,
                },
                body: row.policy_body,
                owner: {
                  id: row.owner_id,
                  username: row.owner_username,
                  email: row.owner_email,
                  fullname: row.owner_fullname,
                  createdAt: row.owner_createdAt,
                  updatedAt: row.owner_updatedAt,
                },
                votes: row.votes ?? 0,
                isVoted: row.isVoted,
                createdAt: row.policy_createdAt,
                updatedAt: row.policy_updatedAt,
              };
            })
          : [];
      const totalCount: number =
        countResult && Array.isArray(countResult)
          ? countResult[0]?.total_count!
          : 0;
      return { data, totalCount };
    })
    .catch((err) => {
      throw new Error("Error fetching policies: " + err.message);
    });
};

export const deletePolicy = async (id: number) => {
  const query = "DELETE FROM `Policies` WHERE `id` = ?";
  return await execute(query, [id]);
};

export const updatePolicy = async ({
  title,
  category_id,
  body,
  owner_id,
  id,
}: IPolicyForm & { id: number }) => {
  const query =
    "UPDATE `Policies` SET `title`=?, `category_id`=?, `body`=?, `owner_id`=? WHERE id = ?";
  const result: any = await execute(query, [
    title,
    category_id,
    body,
    owner_id,
    id,
  ]);

  if (result.changedRows) {
    return await getPolicyById(id);
  } else {
    return null;
  }
};

export const addPolicy = async ({
  title,
  category_id,
  body,
  owner_id,
}: IPolicyForm) => {
  const query =
    "INSERT INTO `Policies` (`title`, `category_id`, `body`, `owner_id`) VALUES (?, ?, ?, ?)";
  const result: any = await execute(query, [
    title,
    category_id,
    body,
    owner_id,
  ]);

  if (result.insertId) {
    return await getPolicyById(result.insertId);
  } else {
    return null;
  }
};

export const getPolicyById = async (id: number, userId?: number) => {
  try {
    let query =
      selectQuery +
      (userId ? checkCurrentUserVotes : "") +
      joinTables +
      " WHERE `Policies`.`id` = ?" +
      groupBy;
    let params = [id];
    if (userId) {
      params = [userId, id];
    }
    const results: any = await queryDatabase(query, params);
    const data = results.length > 0 ? results[0] : null;
    return data
      ? {
          id: data.policy_id,
          title: data.policy_title,
          category: {
            id: data.category_id,
            name: data.category_name,
            color: renderColor(data.category_id),
            description: data.category_description,
            createdAt: data.category_createdAt,
            updatedAt: data.category_updatedAt,
          },
          body: data.policy_body,
          owner: {
            id: data.owner_id,
            username: data.owner_username,
            email: data.owner_email,
            fullname: data.owner_fullname,
            createdAt: data.owner_createdAt,
            updatedAt: data.owner_updatedAt,
          },
          votes: data.votes ?? 0,
          isVoted: data.isVoted,
          createdAt: data.policy_createdAt,
          updatedAt: data.policy_updatedAt,
        }
      : null;
  } catch (error) {
    console.error("Error fetching a policy by id:", error);
    throw error;
  }
};
