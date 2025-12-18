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
    content: {
      options: options, // Pass the options to the plugin content
    },
  };
}

/**
 * @param {import('@docusaurus/types').DocusaurusPluginContent} content
 * @param {import('@docusaurus/types').LoadContext} context
 * @returns {import('@docusaurus/types').Plugin}
 */
function pluginChatbot(content, context) {
  const { baseUrl, siteConfig } = context;
  const { backendUrl } = content.options || {};

  return {
    name: 'docusaurus-plugin-chatbot',

    getClientModules() {
      return [
        require.resolve('./ChatbotInjector'),
      ];
    },

    // Inject configuration via window object
    injectHtmlTags() {
      const finalBackendUrl = process.env.BACKEND_URL ||
                             backendUrl ||
                             'https://ai-humanoid-book-wckc.vercel.app'; // Your deployed backend URL
      return {
        preBodyTags: [
          `<script>
            window.BACKEND_URL = '${finalBackendUrl}';
          </script>`,
        ],
        postBodyTags: [
          `<div id="chatbot-root" style="position: relative; z-index: 9998;"></div>`,
        ],
      };
    },
  };
}

module.exports = pluginChatbot;

module.exports.loadPluginContent = loadPluginContent;

// Simplified validation that just returns the options as is
module.exports.validateOptions = ({ options }) => {
  return options || {};
};