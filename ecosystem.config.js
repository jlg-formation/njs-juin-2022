module.exports = {
  apps: [
    {
      name: "GStock",
      script: "./dist/server.js",
      env_production: {
        NODE_ENV: "production",
      },
      env: {
        NODE_ENV: "development",
        GSTOCK_PORT: 3333,
      },
    },
  ],
};
