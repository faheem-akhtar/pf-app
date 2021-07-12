const path = require("path");

module.exports = {
  stories: ["../**/*.stories.mdx", "../**/*.stories.@(js|jsx|ts|tsx)"],
  presets: [path.resolve(__dirname, "./next-preset.js")],
  features: {
    postcss: false,
  },
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-actions",
    {
      name: "@storybook/addon-essentials",
      options: {
        backgrounds: false,
      },
    },
    "@storybook/addon-a11y",
  ],
};
