const path = require('path');
const srcDir = path.join(__dirname, '../src');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');

module.exports = {
  stories: [`${srcDir}/**/*.stories.mdx`, `${srcDir}/**/*.stories.@(js|jsx|ts|tsx)`],
  features: {
    postcss: false,
  },
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-actions',
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false,
      },
    },
    '@storybook/addon-a11y',
  ],
  webpackFinal: (config) => {
    config.module.rules.push({
      test: /\.(scss)$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader',
        {
          loader: require.resolve('sass-resources-loader'),
          options: {
            // Can be changed for entry point containing sass related content like variables, mixins, etc
            resources: `${srcDir}/styles/global.scss`,
          },
        },
      ],
      include: path.resolve(srcDir),
    });

    [].push.apply(config.resolve.plugins, [new TsconfigPathsPlugin({ extensions: config.resolve.extensions })]);

    return config;
  },
};
