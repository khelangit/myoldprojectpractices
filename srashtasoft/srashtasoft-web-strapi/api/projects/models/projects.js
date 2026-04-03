'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

const slugify = require('slugify');

module.exports = {
  lifecycles: {
    beforeCreate: async (data) => {
      if (data.project_name) {
        data.slug = slugify(data.project_name);
      }
    },
    beforeUpdate: async (params, data) => {
      if (data.project_name) {
        data.slug = slugify(data.project_name);
      }
    },
  },
};
