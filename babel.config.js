module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env', // define um padrão para a importação das variáveis
        allowUndefined: false, // define que se uma variável não foi definida, deve estourar um erro
      },
    ],
  ],
};
