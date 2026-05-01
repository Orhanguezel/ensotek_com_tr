module.exports = {
  apps: [
    {
      name: 'ensotek-com-tr-frontend',
      cwd: '/var/www/Ensotek/ensotek_com_tr/frontend',
      script: '/usr/local/bin/bun',
      args: 'run start',
      exec_mode: 'fork',
      instances: 1,
      autorestart: true,
      max_memory_restart: '450M',
      env: {
        NODE_ENV: 'production',
        PORT: '3021',
        HOSTNAME: '127.0.0.1',
        NEXT_TELEMETRY_DISABLED: '1',
      },
      combine_logs: true,
      time: true,
    },
  ],
};
