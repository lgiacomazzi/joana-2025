import { sql } from '@vercel/postgres';
import { Art, Category } from './definitions';

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
    `;

    const arts = data.rows;
    // console.log(arts);
    return arts;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all arts.');
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
    console.error('Database Error:', err);
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
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all arts.');
  }
}

export async function fetchHomeArts() {
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
      WHERE image_url NOT LIKE '/arts/'
      ORDER BY year DESC
      LIMIT 10
    `;

    const arts = data.rows;
    // console.log(arts);
    return arts;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all arts.');
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
    console.error('Database Error:', err);
    throw new Error('Failed to fetch art categories.');
  }
}

export async function fetchNavLinks() {
  try {
    const categories = fetchCategories();

    const navLinks = [
      { href: '/', title: 'Home' },
      { href: '/blog', title: 'Blog' },
    ];
    return navLinks;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch art categories.');
  }
}
