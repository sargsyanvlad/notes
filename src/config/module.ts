import { env } from '../utilities/dotenv';
import { HttpConfig } from './http.config';
import { ConfigModule } from '@ukitgroup/nestjs-config';
import { RAW_CONFIG } from '@ukitgroup/nestjs-config/tokens';

export const AppConfigModule = ConfigModule.forRoot({
  configs: [HttpConfig],
  providers: [{ provide: RAW_CONFIG, useValue: env }],
});
