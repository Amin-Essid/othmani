const path = require("path");

// create pages dynamically
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    {
      products: allContentfulProduit {
        nodes {
          lien
        }
      }
    }
  `);

  result.data.products.nodes.forEach((product) => {
    createPage({
      path: `/${product.lien}`,
      component: path.resolve(`src/templates/product.js`),
      context: {
        slug: product.lien,
      },
    });
  });
};
