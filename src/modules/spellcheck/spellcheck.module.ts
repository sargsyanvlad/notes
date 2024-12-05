import { Module } from '@nestjs/common';
import { SpellCheckService } from './spellcheck.service';

import { ConfigModule } from '@ukitgroup/nestjs-config';

import { SpellcheckClientAxiosService } from './clients/axios/spellcheck-client.axios.service';
import { SpellcheckClientAxiosConfig } from './clients/axios/spellcheck-client.axios.config';

@Module({
  imports: [ConfigModule.forFeature([SpellcheckClientAxiosConfig])],
  providers: [SpellCheckService, SpellcheckClientAxiosService],
  exports: [SpellCheckService, SpellcheckClientAxiosService],
})
export class SpellCheckModule {}
