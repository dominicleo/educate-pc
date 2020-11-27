const env: string = process.env.APP_ENV || 'production';

type Env = {
  /** 正式环境 */
  production: string;
  /** 测试环境 */
  test: string;
  /** 开发环境 */
  development: string;
  /** 其他环境 */
  [prop: string]: any;
};

const SERVICE_DOMAIN: Env = {
  production: 'https://api-gate.ijia120.com/mooc/',
  test: 'https://hd-api-gate.ijia120.com/mooc/',
  development: 'https://dev-api-gate.ijia120.com/mooc/',
};

export const SERVICE_URL = SERVICE_DOMAIN[env] || SERVICE_DOMAIN.production;
