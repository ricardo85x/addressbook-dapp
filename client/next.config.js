const withImages = require('next-images')
const withSass = require('sass')

const withPlugins = require('next-compose-plugins');
const isDev = process.env.NODE_ENV !== "production";

const GH_PAGE_REPOSITORY = "addressbook-dapp"

module.exports = withPlugins([
    withImages,
    withSass,
    {
        trailingSlash: true,
        basePath: isDev ? "": `/${GH_PAGE_REPOSITORY}`,
        assetPrefix: isDev ? "": `/${GH_PAGE_REPOSITORY}/`   }
])