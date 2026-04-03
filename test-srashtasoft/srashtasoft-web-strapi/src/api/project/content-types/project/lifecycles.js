'use strict';

const slugify = require('slugify');

module.exports = {
  beforeCreate(event) {
    const { data } = event.params;
    if (data.project_name) {
      data.slug = slugify(data.project_name, { lower: true, strict: true });
    }
  },

  beforeUpdate(event) {
    const { data } = event.params;
    if (data.project_name) {
      data.slug = slugify(data.project_name, { lower: true, strict: true });
    }
  },
};
