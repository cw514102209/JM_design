module.exports = {
  presets: [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        corejs: 2,
        useBuiltIns: 'entry',
        targets: {
          esmodules: true,
        },
        modules: 'commonjs',
      },
    ],
  ],
  plugins: ['@babel/transform-runtime'],
}
