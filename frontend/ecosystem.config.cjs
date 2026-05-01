module.exports = {
  apps: [
    {
      name: 'ensotek-com-tr-frontend',
      cwd: '/var/www/Ensotek/ensotek_com_tr/frontend',
      script: 'node .next/standalone/server.js',
      instances: 1,
      max_memory_restart: '450M',
      env: {
        NODE_ENV: 'production',
        PORT: '3021',
        HOSTNAME: '127.0.0.1',
      },
    },
  ],
};
