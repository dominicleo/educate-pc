import zhCN from 'antd/lib/locale/zh_CN';
import fs from 'fs';
import lessVarsToJs from 'less-vars-to-js';
import path from 'path';
import { defineConfig } from 'umi';

const resolvePath = (...args: string[]) =>
  path.resolve(__dirname, '..', ...args);
const SRC_DIR = resolvePath('src');

const THEME_PATH = resolvePath(SRC_DIR, 'components/style/themes/default.less');
const THEME_CONTENT = fs.readFileSync(THEME_PATH, 'utf-8');
const THEME = lessVarsToJs(THEME_CONTENT);

export default defineConfig({
  ssr: {
    devServerRender: false,
  },
  define: {
    'process.env.APP_ENV': process.env.APP_ENV || 'development',
  },
  dynamicImport: {
    loading: '@/components/page-loading',
  },
  title: false,
  nodeModulesTransform: {
    type: 'none',
  },
  lessLoader: {
    lessOptions: {
      javascriptEnabled: true,
    },
  },
  antd: {
    config: {
      locale: zhCN,
    },
  },
  theme: THEME,
  plugins: [resolvePath('config/plugins/generate')],
});
