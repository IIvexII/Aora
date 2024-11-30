const plugin = require("tailwindcss");

module.exports = function (api) {
    api.cache(false);
    return {
      presets: [
        ["babel-preset-expo", { jsxImportSource: "nativewind" }],
        "nativewind/babel",
      ],
      plugins: [
        ['module:react-native-dotenv'],
      ]
    };
  };