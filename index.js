"use strict"

const validateOptions = require("schema-utils");

class CustomModuleIdsPlugin {
	constructor(options) {
		this.options = options || {};

		validateOptions({
			type: 'object',
			additionalProperties: false,
			properties: {
				idFunction: {
					description: "Function called to generate ID of each module. Return value is used as module ID.",
					instanceof: "Function",
				},
				callWhenMissingLibident: {
					"type": "boolean",
				},
			},
			required: ['idFunction'],
		}, this.options, "Custom Module IDs Plugin");
	}

	_processModules(modules, context) {
		for (const module of modules) {
			if (module.id === null && (module.libIdent || this.options.callWhenMissingLibident)) {
				module.id = this.options.idFunction(module.libIdent ? module.libIdent({
					context,
				}) : null, module);
			}
		}
	}

	apply(compiler) {
		const context = this.options.context || compiler.options.context;

		if (compiler.hooks) {
			compiler.hooks.compilation.tap("CustomModuleIdsPlugin", compilation => {
				compilation.hooks.beforeModuleIds.tap("CustomModuleIdsPlugin", modules => {
					this._processModules(modules, context);
				});
			});
		}
		else {
			compiler.plugin("compilation", compilation => {
				compilation.plugin("before-module-ids", modules => {
					this._processModules(modules, context);
				});
			});
		}
	}
}

module.exports = CustomModuleIdsPlugin;