import { parse } from 'dotenv';
import { expand } from 'dotenv-expand';
import { readFileSync } from 'fs';

function isTestEnvironment(): boolean {
  const glob = globalThis as unknown as Record<string, unknown>;
  return !!(glob.describe && glob.it && glob.expect);
}

function isNodeError(err: unknown): err is NodeJS.ErrnoException {
  // HACK: err instanceof Error doesn't work in jest environment for unknown reason 🤬
  if (isTestEnvironment()) {
    return !!err && typeof err === 'object' && 'code' in err;
  }

  return err instanceof Error && 'code' in err;
}

function loadFile(filePath: string) {
  try {
    const buffer = readFileSync(filePath);
    return parse(buffer);
  } catch (err) {
    if (isNodeError(err) && (err.code === 'ENOENT' || err.code === 'EACCES')) {
      return {};
    }

    throw err;
  }
}

type Env = Record<string, string | undefined>;

function loadEnv(): Readonly<Env> {
  const envStore = {} as { [key: string]: string | undefined };

  Object.assign(envStore, loadFile('.env'), loadFile('.env.local'));

  let nodeEnv = process.env.NODE_ENV ?? envStore['NODE_ENV'];
  if (nodeEnv === undefined && isTestEnvironment()) {
    nodeEnv = 'test';
  }

  if (nodeEnv) {
    Object.assign(
      envStore,
      loadFile(`.env.${nodeEnv}`),
      loadFile(`.env.${nodeEnv}.local`),
    );
  }

  const envWithProcessEnv = Object.assign({}, envStore, process.env);

  const { parsed, error } = expand({
    ignoreProcessEnv: true,
    parsed: envWithProcessEnv as unknown as Record<string, string>,
  });

  if (error) {
    console.error('Error on expanding env variables', error);
  }

  return Object.freeze(parsed ?? envWithProcessEnv);
}

export const env = loadEnv();
