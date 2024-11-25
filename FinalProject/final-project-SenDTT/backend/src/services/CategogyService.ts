import { queryDatabase } from "../db";

export const getCategories = async () => {
  try {
    const results: any = await queryDatabase(
      "SELECT * FROM `Categories` ORDER BY name asc",
      []
    );
    return results.length > 0
      ? results.map((item: any) => {
          return { ...item, corlor: renderColor(item.id) };
        })
      : null;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getCategoryById = async (id: number) => {
  try {
    const results: any = await queryDatabase(
      "SELECT * FROM `Categories` WHERE id = ?",
      [id]
    );
    return results.length > 0
      ? {
          ...results[0],
          color: renderColor(results[0].id),
        }
      : null;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const renderColor = (id: number) => {
  switch (id) {
    case 1:
      return "red";
    case 2:
      return "yellow";
    case 3:
      return "green";
    case 4:
      return "blue";
    case 5:
      return "indigo";
    case 6:
      return "purple";
    case 7:
      return "pink";
    default:
      return "gray";
  }
};
