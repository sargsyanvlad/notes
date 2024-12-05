import { Inject, Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { RawAxiosRequestHeaders } from 'axios/index';

import * as process from 'process';
import { SpellcheckClientAxiosConfig } from './spellcheck-client.axios.config';
import { ISpellcheckClient } from '../../spellcheck-client.interface';

export type CheckResult = {
  isValid: boolean;
};

@Injectable()
export class SpellcheckClientAxiosService implements ISpellcheckClient {
  private readonly axiosInstance: AxiosInstance;

  constructor(
    @Inject(SpellcheckClientAxiosConfig)
    private readonly config: SpellcheckClientAxiosConfig,
  ) {
    this.axiosInstance = axios.create({
      baseURL: this.config.baseUrl,
    });
  }

  public async check(text: string, sign: string): Promise<boolean> {
    try {
      const headers: RawAxiosRequestHeaders = { 'x-hash': sign };
      const response = await this.axiosInstance.post<CheckResult>(
        '/check',
        { text },
        { headers },
      );
      return response.data.isValid;
    } catch (e) {
      console.error(e.message);
      return process.env.NODE_ENV !== 'prod';
    }
  }
}
