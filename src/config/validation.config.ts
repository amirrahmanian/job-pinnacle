import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string().default('development'),
  POSTGRES_URL: Joi.string().required(),
  POSTGRES_PORT: Joi.number().port().required(),
  POSTGRES_DBNAME: Joi.string().required(),
  POSTGRES_USERNAME: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  SESSION_SECRET: Joi.string().required(),
  SESSION_SALT: Joi.string().required(),
  SESSION_EXPIRES_IN: Joi.string().required(),
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().port().required(),
  REDIS_PASSWORD: Joi.string().required(),
});
