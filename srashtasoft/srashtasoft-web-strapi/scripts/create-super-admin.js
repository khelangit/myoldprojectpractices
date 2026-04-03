module.exports = async () => {
    try {
      // Find existing role
      let role = await strapi.query('role', 'admin').findOne({ name: 'Super Admin' });
      
      if (!role) {
        role = await strapi.query('role', 'admin').create({
          name: 'Super Admin',
          code: 'strapi-super-admin',
          description: 'Super Admins can access everything.'
        });
      }
  
      // Use the admin service instead of query
      let user = await strapi.admin.services.user.findOne({ email: 'purvesh.srashtasoft@gmail.com' });
      
      if (!user) {
        user = await strapi.admin.services.user.create({
          firstname: 'Admin',
          lastname: 'User',
          email: 'purvesh.srashtasoft@gmail.com',
          roles: [role._id],
          password: 'Admin123!',
          isActive: true
        });
      } else {
        await strapi.admin.services.user.updateById(user._id, {
          roles: [role._id],
          password: 'Admin123!',
          isActive: true
        });
      }
  
      // Verify the user was created/updated
      const verifyUser = await strapi.admin.services.user.findOne({ email: 'purvesh.srashtasoft@gmail.com' });
      if (verifyUser) {
        console.log('Super admin verified successfully');
        console.log('Email:', verifyUser.email);
        console.log('Role:', role.name);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };