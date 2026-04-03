// Add this to your gatsby-node.js file where you create pages for life-at-srashtasoft

const slugify = require('slugify');
require('events').EventEmitter.defaultMaxListeners = 50;

exports.createPages = async function ({ actions, graphql }) {
  try {
    const { createPage } = actions;

    // BLOG PAGES
    const blogData = await graphql(`{
      allStrapiBlogs(sort: {fields: createdAt, order: DESC}) {
        edges {
          node {
            id
            slug
          }
        }
      }
    }`);

    if (blogData.errors) {
      console.warn("⚠️ Blog data fetch error:", blogData.errors);
    } else {
      blogData.data.allStrapiBlogs.edges.forEach(({ node }) => {
        const slug = node?.slug;
        if (!slug) return;

        createPage({
          path: `/blog/${slug}/`,
          component: require.resolve('./src/components/DynamicPages/BlogDetailPage.js'),
          context: { slug },
        });
      });
    }

    // BLOG CATEGORY PAGES
    const blogCategoryData = await graphql(`{
      allStrapiBlogs {
        group(field: blog_category___category) {
          fieldValue
        }
      }
    }`);

    if (blogCategoryData.errors) {
      console.warn("⚠️ Blog category fetch error:", blogCategoryData.errors);
    } else {
      blogCategoryData.data.allStrapiBlogs.group.forEach(({ fieldValue }) => {
        if (!fieldValue) return;
        const slug = slugify(fieldValue);
        createPage({
          path: `/blog-categories/${slug}/`,
          component: require.resolve('./src/components/DynamicPages/BlogCategoryPage.js'),
          context: { slug },
        });
      });
    }

    // PROJECT PAGES
    const projectData = await graphql(`{
      allStrapiProjects(sort: {fields: id, order: DESC}) {
        edges {
          node {
            id
            slug
          }
        }
      }
    }`);

    if (projectData.errors) {
      console.warn("⚠️ Project data fetch error:", projectData.errors);
    } else {
      projectData.data.allStrapiProjects.edges.forEach(({ node }) => {
        const slug = node?.slug;
        if (!slug) return;

        createPage({
          path: `/project/${slug}/`,
          component: require.resolve('./src/components/DynamicPages/ProjectDetailPage.js'),
          context: { slug },
        });
      });
    }

    // TECHNOLOGY / SERVICE PAGES
    const serviceData = await graphql(`{
      allStrapiTechnologies {
        edges {
          node {
            id
            name
            slug
            tech_category {
              name
            }
          }
        }
      }
    }`);

    if (serviceData.errors) {
      console.warn("⚠️ Technology data fetch error:", serviceData.errors);
    } else {
      const categories = [
        { key: 'web', path: 'web-application-development' },
        { key: 'mobile', path: 'mobile-application-development' },
        { key: 'ecommerce', path: 'ecommerce-development' }, // fixed spelling
        { key: 'webdesign', path: 'webdesign-development' },
      ];

      categories.forEach(({ key, path }) => {
        const filtered = serviceData.data.allStrapiTechnologies.edges.filter(
          ({ node }) => node.tech_category?.name === key
        );
        filtered.forEach(({ node }) => {
          const slug = node?.slug;
          if (!slug) return;

          createPage({
            path: `/services/${path}/${slug}/`,
            component: require.resolve('./src/components/DynamicPages/ServiceDetailPage.js'),
            context: { slug },
          });
        });
      });
    }

    // LIFE AT COMPANY PAGES
    const lifeAtCompanyData = await graphql(`{
      allStrapiLifeAtCompanies {
        edges {
          node {
            festival
          }
        }
      }
    }`);

    if (lifeAtCompanyData.errors) {
      console.warn("⚠️ Life at company fetch error:", lifeAtCompanyData.errors);
    } else {
      console.log("Creating Life at Company pages...");
      
      lifeAtCompanyData.data.allStrapiLifeAtCompanies.edges.forEach(({ node }) => {
        // Make sure we have a festival name
        if (!node || !node.festival) {
          console.warn("⚠️ Missing festival name for a Life at Company entry");
          return;
        }
        
        const festivalName = node.festival;
        console.log(`Creating page for festival: ${festivalName}`);
        
        // Create a URL-safe version of the festival name
        const slug = festivalName;
        
        createPage({
          path: `/life-at-srashtasoft/${slug}/`,
          component: require.resolve('./src/components/DynamicPages/LifeAtCompanyDynamic.js'),
          context: { 
            slug: slug  // Pass the exact festival name for the query
          },
        });
      });
    }
  } catch (err) {
    console.error("❌ Error during createPages:", err);
  }
};

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /bad-module/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};
