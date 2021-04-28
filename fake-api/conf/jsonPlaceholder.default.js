module.exports = {
	// The configuration settings for the OAS2 flow-node: JSON Placeholder
	pluginConfig: {
		'@axway/api-builder-plugin-fn-swagger': {
			'jsonPlaceholder': {
				// It is possible to override URI options when constructing
				// outbound requests to this service.
				uri: {
					// protocol: 'https',
					// host: 'hostname',
					// port: 443,
					// basePath: '/api'
				}
			}
		}
	}
};
