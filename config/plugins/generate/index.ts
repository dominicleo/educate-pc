import camelcase from 'camelcase';
import { basename, join } from 'path';

import { IApi } from '@umijs/types';
import { Generator, randomColor } from '@umijs/utils';

const generatorCommand = (api: IApi) => {
  return ({
    name,
    alias,
    generator,
  }: {
    name: string;
    alias: string[];
    generator: any;
  }) => {
    api.registerGenerator({
      key: name,
      // @ts-ignore
      Generator: generator({ api }),
    });
    Array.isArray(alias) &&
      alias.forEach((key) => {
        api.registerGenerator({
          key,
          // @ts-ignore
          Generator: generator({ api }),
        });
      });
  };
};

const createPageGenerator = ({ api }: { api: IApi }) => {
  return class PageGenerator extends Generator {
    constructor(opts: any) {
      super(opts);
    }

    async writing() {
      const [path] = this.args._;
      const jsExt = this.args.t || this.args.typescript ? '.tsx' : '.js';
      const isLess = this.args.l || this.args.less;
      const cssExt = isLess ? '.less' : '.css';

      this.copyTpl({
        templatePath: join(__dirname, 'page', `template${jsExt}.tpl`),
        target: join(api.paths.absPagesPath!, `${path}${jsExt}`),
        context: {
          path,
          name: basename(path),
          cssExt,
        },
      });

      this.copyTpl({
        templatePath: join(__dirname, 'page', `template.css.tpl`),
        target: join(api.paths.absPagesPath!, `${path}${cssExt}`),
        context: {
          color: randomColor(),
          less: isLess,
        },
      });
    }
  };
};

const createServiceGenerator = ({ api }: { api: IApi }) => {
  return class ServiceGenerator extends Generator {
    constructor(opts: any) {
      super(opts);
    }

    firstUppercase(value: string) {
      return value.replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
    }

    getServiceName(name: string | string[], suffix = 'service') {
      if (Array.isArray(name)) {
        return;
      }
    }

    async writing() {
      const [path] = this.args._;
      const isTs = this.args.t || this.args.typescript;
      const isMapper = this.args.m || this.args.mapper;
      const jsExt = isTs ? '.ts' : '.js';
      const name = this.args.n || this.args.name;
      const paths = path.split('/');
      const serviceName = camelcase(
        name && typeof name === 'string'
          ? name
          : (paths.filter(
              (path, index) =>
                !(/index/.test(path) && index === paths.length - 1),
            ) as string[]),
        {
          pascalCase: true,
        },
      );

      this.copyTpl({
        templatePath: join(__dirname, 'service', `template${jsExt}.tpl`),
        target: join(api.paths.absSrcPath!, 'services', `${path}${jsExt}`),
        context: {
          name: basename(path),
          serviceName,
          mapper: isMapper,
        },
      });

      if (isTs) {
        this.copyTpl({
          templatePath: join(__dirname, 'service', `template.types.d.ts.tpl`),
          target: join(api.paths.absSrcPath!, 'services', `${path}.types.d.ts`),
          context: {},
        });
      }

      if (isMapper) {
        this.copyTpl({
          templatePath: join(
            __dirname,
            'service',
            `template.mapper${jsExt}.tpl`,
          ),
          target: join(api.paths.absSrcPath!, 'services', `${path}.mapper.ts`),
          context: {
            name: basename(path),
            serviceName,
          },
        });
      }
    }
  };
};

export default (api: IApi) => {
  generatorCommand(api)({
    name: 'page',
    alias: ['p'],
    generator: createPageGenerator,
  });

  generatorCommand(api)({
    name: 'service',
    alias: ['s'],
    generator: createServiceGenerator,
  });
};
