module.exports = {
  apps: [
    {
      name: 'backend-app',
      script: './index.js',
      watch: false,
      force: true,
      env: {
        PORT: 4500,
        NODE_ENV: 'production',
        MY_ENV_VAR: 'MyVarValue',
      },
    },
  ],
};
