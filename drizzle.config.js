/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:CGQdyhj04gvt@ep-dawn-sunset-a1w2pjbw.ap-southeast-1.aws.neon.tech/ai-interview-mocker?sslmode=require',
    }
  };