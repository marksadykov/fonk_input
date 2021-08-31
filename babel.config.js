const cssModulesPlugin = () => [
  'babel-plugin-react-css-modules',
  {
    filetypes: {
      '.scss': {
        syntax: 'postcss-scss',
        plugins: ['postcss-nested'],
      },
    },
    generateScopedName: '[name]__[local]__[hash:base64:5]',
    autoResolveMultipleImports: true,
  },
];

module.exports = api => {
  const nodeEnv = api.cache(() => process.env.NODE_ENV);

  const plugins = [
    cssModulesPlugin(),
    require('@babel/plugin-proposal-optional-chaining'),
    require('@babel/plugin-proposal-export-default-from'),
    require('@babel/plugin-proposal-class-properties'),
  ];

  return {
    babelrcRoots: ['.', 'src/*'],

    presets: [
      [
        require('@babel/preset-env'),
        {
          targets: {
            browsers: ['> 0.25%, not dead'],
          },
        },
      ],
      require('@babel/preset-react'),
      require('@babel/preset-typescript'),
    ],

    plugins,
  };
};
