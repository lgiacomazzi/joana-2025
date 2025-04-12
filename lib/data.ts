import { sql } from "@vercel/postgres";
import { Art, Category } from "./definitions";

export async function fetchArts() {
  try {
    const data = await sql<Art>`
      SELECT
        id,
        title,
        description,
        dimensions,
        category,
        year,
        image_url
      FROM arts
      WHERE is_visible = TRUE
      ORDER BY RANDOM()
    `;

    const arts = data.rows;
    // console.log(arts);
    return arts;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all arts.");
  }
}

export async function fetchBugs(
  search?: string,
  category?: string,
  year?: string
) {
  const whereClauses: string[] = [];
  const values: string[] = [];

  if (search) {
    values.push(`%${search}%`);
    whereClauses.push(`title ILIKE $${values.length}`);
  }

  if (category) {
    values.push(category);
    whereClauses.push(`category = $${values.length}`);
  }

  if (year) {
    values.push(year);
    whereClauses.push(`year = $${values.length}`);
  }

  const whereSQL =
    whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

  try {
    const query = `
    SELECT * FROM arts
    ${whereSQL}
    ORDER BY id
  `;

    const data = await sql.query(query, values);

    const arts = data.rows;
    // console.log(arts);
    return arts;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all arts.");
  }
}

export async function fetchArtById(id: string) {
  try {
    const data = await sql<Art>`
      SELECT * FROM arts
      WHERE id = ${id}
      LIMIT 1
    `;

    const art = data.rows[0];
    console.log(art);
    return art;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error(`Failed to fetch art with id ${id}`);
  }
}

export async function fetchCategoryArts(category: string) {
  try {
    const data = await sql<Art>`
      SELECT
        id,
        title,
        description,
        dimensions,
        category,
        year,
        image_url
      FROM arts
      WHERE category LIKE ${category}
      ORDER BY year DESC
    `;

    const arts = data.rows;
    return arts;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error(`Failed to fetch all ${category} arts.`);
  }
}

export async function fetchYearlyPaintings(year: string, category: string) {
  try {
    const data = await sql<Art>`
      SELECT
        id,
        title,
        description,
        dimensions,
        category,
        year,
        image_url
      FROM arts
      WHERE year LIKE ${year} AND category LIKE ${category}
      ORDER BY title DESC
    `;

    const arts = data.rows;
    // await new Promise((resolve) => setTimeout(resolve, 20000)); //Delay
    return arts;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all arts.");
  }
}

export async function fetchHomeArts() {
  try {
    const data = await sql<Art>`
      SELECT
        id,
        title,
        category,
        year,
        image_url
      FROM arts
      WHERE in_carousel = TRUE
      ORDER BY year DESC
      LIMIT 10
    `;

    const arts = data.rows;
    // console.log(arts);
    return arts;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch Carousel arts.");
  }
}

export async function fetchCategories() {
  try {
    const data = await sql<Category>`
      SELECT 
        category as name, 
        ARRAY_AGG(DISTINCT year ORDER BY year DESC) AS years
      FROM arts
      GROUP BY category
      ORDER BY category DESC
    `;

    const categories = data.rows;
    // console.log(categories);
    return categories;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch art categories.");
  }
}

export async function fetchYears() {
  try {
    const data = await sql`
      SELECT year FROM arts
      GROUP BY year
      ORDER BY year DESC
    `;

    const years = data.rows;
    // console.log(years);
    return years;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch art categories.");
  }
}

export async function setArtVisibilityById(id: string, visible: boolean) {
  try {
    await sql`UPDATE arts SET is_visible = ${visible} WHERE id = ${id}`;
    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar visibilidade da arte:" + id, error);
    return { success: false, error };
  }
}

export async function setArtInCarouselById(id: string, visible: boolean) {
  try {
    await sql`UPDATE arts SET in_carousel = ${visible} WHERE id = ${id}`;
    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar a arte:" + id, error);
    return { success: false, error };
  }
}

export async function deleteArtById(id: string) {
  try {
    await sql`DELETE FROM arts WHERE id = ${id}`;
    return { success: true };
  } catch (error) {
    console.error("Erro ao deletar arte: " + id, error);
    return { success: false, error };
  }
}
