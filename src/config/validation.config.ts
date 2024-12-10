import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string().default('development'),
  POSTGRES_URL: Joi.string().required(),
  POSTGRES_PORT: Joi.number().port().required(),
  POSTGRES_DBNAME: Joi.string().required(),
  POSTGRES_USERNAME: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
});
