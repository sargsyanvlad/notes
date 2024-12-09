import { Module } from '@nestjs/common';
import { ConfigModule } from '@ukitgroup/nestjs-config';

import { SpellcheckClientAxiosConfig } from './clients/axios/spellcheck-client.axios.config';
import { SpellcheckClientAxiosService } from './clients/axios/spellcheck-client.axios.service';
import { SpellCheckService } from './spellcheck.service';

@Module({
  imports: [ConfigModule.forFeature([SpellcheckClientAxiosConfig])],
  providers: [SpellCheckService, SpellcheckClientAxiosService],
  exports: [SpellCheckService, SpellcheckClientAxiosService],
})
export class SpellCheckModule {}
