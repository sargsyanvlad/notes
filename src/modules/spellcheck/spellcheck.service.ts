import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { SpellcheckClientAxiosService } from './clients/axios/spellcheck-client.axios.service';

@Injectable()
export class SpellCheckService {
  constructor(
    private readonly spellCheckClient: SpellcheckClientAxiosService,
  ) {}

  async checkSpelling(text: string): Promise<boolean> {
    const hash = crypto.createHash('sha256').update(text).digest('hex');
    return this.spellCheckClient.check(text, hash);
  }
}
