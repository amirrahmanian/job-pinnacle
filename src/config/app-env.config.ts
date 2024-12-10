export default () => ({
  nodeEnv: process.env.NODE_ENV ?? 'development',

  // postgres
  postgres: {
    url: process.env.POSTGRES_URL,
    port: parseInt(process.env.POSTGRES_PORT),
    dbname: process.env.POSTGRES_DBNAME,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
  },
});
