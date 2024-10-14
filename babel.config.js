module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'dotenv-import',
      {
        moduleName: '@env',
        path: 'src/Config/.env',
      },
    ],
  ],
};
