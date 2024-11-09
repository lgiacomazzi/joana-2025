const { db } = require('@vercel/postgres');

const {
  arts
} = require('../lib/data-arts');

const bcrypt = require('bcrypt');

async function seedArts(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "arts" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS arts (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        image_url VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        dimensions VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL,
        year VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "arts" table`);

    // Insert data into the "arts" table
    const insertedArts = await Promise.all(
      arts.map(
        (art) => client.sql`
        INSERT INTO arts (id, image_url, title, dimensions, description, category, year)
        VALUES (${art.id}, ${art.image_url}, ${art.title}, ${art.dimensions},  ${art.description},  ${art.category}, ${art.year})
        ON CONFLICT (id) DO UPDATE SET
        image_url = EXCLUDED.image_url,
        title = EXCLUDED.title,
        dimensions = EXCLUDED.dimensions,
        description = EXCLUDED.description,
        category = EXCLUDED.category,
        year = EXCLUDED.year;
      `,
      ),
    );

    console.log(`Seeded ${insertedArts.length} arts`);

    return {
      createTable,
      customers: insertedArts,
    };
  } catch (error) {
    console.error('Error seeding arts:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedArts(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed arts to the database:',
    err,
  );
});
