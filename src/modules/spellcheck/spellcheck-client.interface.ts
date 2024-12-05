export interface ISpellcheckClient {
  check(text: string, sign: string, forceValidate: boolean): Promise<boolean>;
}
