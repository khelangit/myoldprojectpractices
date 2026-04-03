module.exports = ({ env }) => ({
  graphql: {
    enabled: env.bool('GRAPHQL_ENABLED', true),
  },
  documentation: {
    enabled: env.bool('DOCUMENTATION_ENABLED', true),
  },
});
