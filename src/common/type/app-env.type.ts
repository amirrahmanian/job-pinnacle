import { ConfigType } from '@nestjs/config';
import appEnvConfig from 'src/config/app-env.config';

export type AppEnvConfigType = ConfigType<typeof appEnvConfig>;
