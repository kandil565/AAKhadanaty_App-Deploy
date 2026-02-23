module.exports = {
  apps: [
    {
      name: "aakhadanaty-backend",
      script: "server.js",
      cwd: "./backend",
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "production",
        PORT: 5000
      }
    }
  ]
};
