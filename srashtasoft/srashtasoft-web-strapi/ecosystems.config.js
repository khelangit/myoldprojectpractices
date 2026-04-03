module.exports = {
  apps: [
    {
      name: 'strapi-project',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        STRAPI_DISABLE_CONTENT_TYPE_BUILDER: false
      },
      exp_backoff_restart_delay: 100,
    },
  ],
};
