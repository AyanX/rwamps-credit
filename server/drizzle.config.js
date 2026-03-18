const {defineConfig} = require('drizzle-kit');

module.exports = defineConfig({
  schema: './models/schema.js',
  dialect:"mysql",
  out: './drizzle/migrations',
  dbCredentials: {
 url: process.env.DATABASE_URL,
  },
});