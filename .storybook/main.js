const path = require('path');
const srcDir = path.join(__dirname, '../src');

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
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
          },
        },
        'sass-loader',
      ],
      include: path.resolve(srcDir),
    });

    return config;
  },
};
