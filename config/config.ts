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
  ssr: {},
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
  hash: true,
  chunks: ['styles', 'umi', 'common'],
  chainWebpack: (config) => {
    config.merge({
      optimization: {
        minimize: true,
        splitChunks: {
          chunks: 'all',
          minChunks: 2,
          automaticNameDelimiter: '.',
          cacheGroups: {
            styles: {
              name: 'styles',
              chunks: 'all',
              test: /\.(less|css)$/,
              minChunks: 1,
              minSize: 0,
              priority: 120,
              reuseExistingChunk: true,
              enforce: true,
            },

            common: {
              name: 'common',
              minChunks: 1,
              test({ resource }) {
                return (
                  /[\\/]node_modules[\\/](antd|@ant-design)/.test(resource) ||
                  /[\\/]src[\\/](layouts|components|utils)/.test(resource)
                );
              },
              priority: 10,
            },
          },
        },
      },
    });
  },
});
