import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import hooksPlugin from 'eslint-plugin-react-hooks';

export default [
  reactRecommended,

  {
    files: ['src/**/*.jsx', 'src/**/*.js', 'cypress/**/*.jsx', 'cypress/**/*.js'],

    plugins: {
      'react-hooks': hooksPlugin,
    },

    rules: {
      ...hooksPlugin.configs.recommended.rules,

      indent: ['error', 2, { SwitchCase: 1 }],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],

      'react/prop-types': 'off',
    },
  },

  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
