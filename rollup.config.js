const path = require('path');
const { babel } = require('@rollup/plugin-babel');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const { terser } = require('rollup-plugin-terser');
const merge = require('lodash.merge');
const typescript = require('rollup-plugin-typescript2');
const babelConfig = require('./babel.config');
const pkg = require('./package.json');

const extensions = ['.js', '.ts'];
const moduleName = 'ZOssImage';

const resolve = function (...args) {
  return path.resolve(process.cwd(), ...args);
};

// 打包任务的个性化配置
const jobs = {
  es: {
    output: {
      format: 'es',
      file: resolve(pkg.main),
      plugins: [],
    },
  },
  umd: {
    output: {
      format: 'umd',
      file: resolve(pkg.module),
      name: moduleName,
      plugins: [],
    },
  },
  min: {
    output: {
      format: 'umd',
      file: resolve(pkg.main.replace(/(.\w+)$/, '.min$1')),
      name: moduleName,
    },
    plugins: [terser()],
  },
};

// 从环境变量获取打包特征
const mergeConfig = jobs[process.env.FORMAT || 'esm'];
const resolveOptions = {
  extensions,
  modulesOnly: !process.env.FORMAT === 'min',
};
// const typescriptOptions =
//   process.env.FORMAT === 'min'
//     ? {
//         module: 'commonjs',
//       }
//     : {};
module.exports = merge(
  {
    input: resolve('./src/index.ts'),
    plugins: [
      typescript({
        useTsconfigDeclarationDir: true,
        sourceMap: false
      }),
      nodeResolve(resolveOptions),
      commonjs({ extensions }),
      babel({
        exclude: 'node_modules/**',
        extensions,
        ...babelConfig,
        plugins: ['transform-class-properties'],
      }),
    ],
  },
  mergeConfig,
);
