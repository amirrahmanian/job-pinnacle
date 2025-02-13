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

  // mongo
  mongo: {
    uri: process.env.MONGO_URI,
  },

  // jwt
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },

  // session
  session: {
    secret: process.env.SESSION_SECRET,
    salt: process.env.SESSION_SALT,
    expiresIn: process.env.SESSION_EXPIRES_IN,
  },

  // redis
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD,
  },

  // mail
  mail: {
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
  },
});
