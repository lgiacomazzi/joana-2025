import { sql } from "@vercel/postgres";
import { Art, Category } from "./definitions";
import { cache } from "react";

export async function fetchArts() {
  try {
    const data = await sql<Art>`
      SELECT *
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

export async function fetchPaginatedArts(page = 1, pageSize = 10) {
  try {
    const offset = (page - 1) * pageSize;

    const data = await sql<Art>`
      SELECT *
      FROM arts
      WHERE is_visible = TRUE
      ORDER by createdAt DESC, id DESC
      LIMIT ${pageSize}
      OFFSET ${offset}
    `;

    const arts = data.rows;
    return arts;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch paginated arts.");
  }
}

export async function fetchBugs(
  search?: string,
  category?: string,
  year?: string
) {
  const whereClauses: string[] = [];
  const values: string[] = [];
  console.log("fetchBugs with ", search, category, year);

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
    ORDER BY createdAt DESC, id ASC
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

export async function fetchArtsBySearch(search?: string) {
  console.log("fetchArtsBySearch with ", search);

  try {
    const data = await sql<Art>`
    SELECT * FROM arts
    WHERE (title ILIKE ${`%${search}%`} OR description ILIKE ${`%${search}%`}) AND is_visible = TRUE
    ORDER BY createdAt DESC, updatedAt DESC, title ASC
  `;

    const arts = data.rows;
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
    return art;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error(`Failed to fetch art with id ${id}`);
  }
}

export async function fetchRelatedArtsFromId(id: string) {
  try {
    const data = await sql<Art>`
    SELECT * FROM arts
    WHERE id != ${id}
      AND category = (
        SELECT category FROM arts WHERE id = ${id}
      )
      AND year = (
        SELECT year FROM arts WHERE id = ${id}
      )
    ORDER by id
    `;

    const arts = data.rows;
    return arts;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error(`Failed to fetch related arts from id ${id}`);
  }
}

export async function fetchCategoryArts(category: string) {
  try {
    const data = await sql<Art>`
      SELECT *
      FROM arts
      WHERE category LIKE ${category} AND is_visible = TRUE
      ORDER BY createdAt DESC
    `;

    const arts = data.rows;
    return arts;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error(`Failed to fetch all ${category} arts.`);
  }
}

export async function mockFetchCategoryArts(category?: string) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const arts = [
    {
      id: "1",
      title: "Moch Art 1",
      dimensions: "100x100",
      description: "This is a mock art piece.",
      category: "foto",
      year: "2023",
      image_url:
        "https://drive.google.com/uc?id=14hvHp4JteEAZmg3KrXg87lsZ4op_EuXa",
      is_visible: true,
      is_available: true,
      in_carousel: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Moch Art 2",
      dimensions: "200x200",
      description: "This is another mock art piece.",
      category: "painting",
      year: "2023",
      image_url:
        "https://drive.google.com/uc?id=14hvHp4JteEAZmg3KrXg87lsZ4op_EuXa",
      is_visible: true,
      is_available: true,
      in_carousel: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  if (category) {
    return arts.filter((art) => art.category === category);
  }

  return arts;
}

export async function fetchYearlyPaintings(year: string, category: string) {
  try {
    const data = await sql<Art>`
      SELECT *
      FROM arts
      WHERE year LIKE ${year} AND category LIKE ${category} AND is_visible = TRUE
      ORDER BY createdAt DESC
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
      SELECT *
      FROM arts
      WHERE in_carousel = TRUE AND is_visible = TRUE
      ORDER BY createdAt DESC
    `;

    const arts = data.rows;
    // console.log(arts);
    return arts;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch Carousel arts.");
  }
}

export async function fetchAvailableArts() {
  try {
    const data = await sql<Art>`
      SELECT *
      FROM arts
      WHERE is_visible = TRUE AND is_available = TRUE
    `;

    const arts = data.rows;
    // console.log(arts);
    return arts;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch available arts.");
  }
}

export const fetchCategories = cache(async function () {
  try {
    const data = await sql<Category>`
      SELECT
        category as name,
        ARRAY_AGG(DISTINCT year ORDER BY year DESC) AS years
      FROM arts
      GROUP BY category
      ORDER BY category DESC
    `;
    return data.rows;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch art categories.");
  }
});

export const fetchYears = cache(async function () {
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
});

export async function setArtVisibilityById(id: string, visible: boolean) {
  try {
    const updatedAt = new Date().toISOString(); // Current timestamp
    await sql`UPDATE arts SET is_visible = ${visible}, updatedAt = ${updatedAt} WHERE id = ${id}`;
    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar visibilidade da arte:" + id, error);
    return { success: false, error };
  }
}

export async function setArtInCarouselById(id: string, visible: boolean) {
  try {
    const updatedAt = new Date().toISOString(); // Current timestamp
    await sql`UPDATE arts SET in_carousel = ${visible}, updatedAt = ${updatedAt} WHERE id = ${id}`;
    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar a arte:" + id, error);
    return { success: false, error };
  }
}

export async function setArtAvailabilitylById(id: string, sellable: boolean) {
  try {
    const updatedAt = new Date().toISOString(); // Current timestamp
    await sql`UPDATE arts SET is_available = ${sellable}, updatedAt = ${updatedAt} WHERE id = ${id}`;
    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar a arte:" + id, error);
    return { success: false, error };
  }
}

export async function updateArtById(id: string, art: Partial<Art>) {
  try {
    const {
      title,
      dimensions,
      description,
      category,
      year,
      image_url, // Image URL is required
      is_visible,
      is_available,
      in_carousel,
    } = art;

    const updatedAt = new Date().toISOString();

    await sql`
      UPDATE arts 
      SET 
        title = ${title}, 
        dimensions = ${dimensions},
        description = ${description},
        category = ${category},
        year = ${year},
        image_url = ${image_url},
        is_visible = ${is_visible},
        is_available = ${is_available},
        in_carousel = ${in_carousel},
        updatedAt = ${updatedAt} 
      WHERE id = ${id}
    `;

    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar a arte:" + id, error);
    return { success: false, error };
  }
}

export async function createArt(art: Partial<Art>) {
  try {
    // Set default values for optional fields
    const {
      title,
      dimensions,
      description,
      category = "uncategorized", // Default category
      year = "0000", // Default year
      image_url, // Image URL is required
      is_visible = false, // Default visibility
      is_available = false, // Default availability
      in_carousel = false, // Default carousel status
    } = art;

    const createdAt = new Date().toISOString(); // Current timestamp
    const updatedAt = createdAt; // Same as createdAt for new items

    await sql`
      INSERT INTO arts (title, dimensions, description, category, year, image_url, is_visible, is_available, in_carousel, createdAt, updatedAt)
      VALUES (${title}, ${dimensions}, ${description}, ${category}, ${year}, ${image_url}, ${is_visible}, ${is_available}, ${in_carousel}, ${createdAt}, ${updatedAt})
    `;

    return { success: true };
  } catch (error) {
    console.error("Erro ao criar nova arte:", error);
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
