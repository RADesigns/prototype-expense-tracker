import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// for migrations
const migrationClient = postgres(process.env.DATABASE_URL!, { max: 1 });
await migrate(drizzle(migrationClient), {migrationsFolder: "./drizzle"})
console.log("migration complete")

// Don't forget to close the connection, otherwise the script will hang
//await connection.end();