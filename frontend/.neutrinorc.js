module.exports = {
  use: [
    [
      '@neutrinojs/airbnb',
      {
        eslint: {
          rules: {
            "react/prefer-stateless-function": "off",
            "indent": ["error", 4],
            "react/jsx-indent": [4, 4],
            "react/jsx-indent-props": [4,4],
            "function-paren-newline": ["error", "consistent"],
            "react/jsx-closing-bracket-location": "off",
            "react/no-array-index-key": "off",
          }
        }
      }
    ],
    [
      '@neutrinojs/react',
      {
        html: {
          title: 'Coin info'
        }
      }
    ],
    '@neutrinojs/jest'
  ]
};
