module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'mongoose',
      settings: {
        uri: env('DATABASE_URI', 'mongodb://localhost:27017/srashtas_123'), //mongodb+srv://info:1M012SrTyvHdUflw@cluster0.f9vot21.mongodb.net/srashtasoft-backend
      },
      options: {
        ssl: false,
      },
    },
  },
});

