module.exports = {
  presets: ['@react-native/babel-preset'],
  plugins: [
    ['module:react-native-dotenv', {
      "moduleName": "@env",
      "path": ".env",
      "blocklist": null,
      "allowlist": null,
      "safe": false,
      "allowUndefined": true,
      "verbose": false
    }],
    'react-native-reanimated/plugin', // MUST be last
  ],
};
