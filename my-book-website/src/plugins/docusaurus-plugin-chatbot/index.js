// @ts-check

/**
 * @param {import('@docusaurus/types').PluginContentLoadedActions} actions
 * @param {Object} options
 * @returns {Promise<{name: string, content: Object}>}
 */
async function loadPluginContent(actions, options) {
  // This function loads the plugin content
  return {
    name: 'chatbot-plugin',
    content: {}, // No special content needed for this plugin
  };
}

/**
 * @param {import('@docusaurus/types').DocusaurusPluginContent} content
 * @param {import('@docusaurus/types').LoadContext} context
 * @returns {import('@docusaurus/types').Plugin}
 */
function pluginChatbot(content, context) {
  return {
    name: 'docusaurus-plugin-chatbot',

    getClientModules() {
      return [
        require.resolve('./ChatbotInjector'),
      ];
    },

    // Remove the manual HTML injection since we're creating it in the injector
    // This avoids potential conflicts
    injectHtmlTags() {
      return {
        postBodyTags: [
          `<div id="chatbot-root" style="position: relative; z-index: 9998;"></div>`,
        ],
      };
    },
  };
}

module.exports = pluginChatbot;
module.exports.validateOptions = () => ({});
module.exports.loadPluginContent = loadPluginContent;