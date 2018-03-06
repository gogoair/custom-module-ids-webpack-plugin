# WebpackCustomModuleIdsPlugin

Absolute control over module IDs in webpack bundles. Should support webpack versions 3 and 4 at least. Feel free to make a PR to support earlier versions.

[![npm version](https://badge.fury.io/js/custom-module-ids-webpack-plugin.svg)](http://badge.fury.io/js/custom-module-ids-webpack-plugin)

## Install

```
npm install custom-module-ids-webpack-plugin --save-dev

```

or yarn equivalent

```
yarn add custom-module-ids-webpack-plugin --dev

```

## Usage

Simplest use case would look like:

```
var CustomModuleIdsPlugin = require('custom-module-ids-webpack-plugin');
...
plugins: [
...
new CustomModuleIdsPlugin({
	idFunction: function(libIdent, module) {
		...
	}
})
...
]
```

but in truth there's no limit to how complex the idFunction can get.

## Options

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`idFunction`**|`{Function<(libIdent: String, module: Object) -> {primtive}>}`||Required. Function used to generate module IDs. The return will be used as module ID and should be a valid object key. libIdent argument is generated by calling module.libIdent() and should usually be path to the module file relative to the context. The second argument is a reference to the module object in case more info than just libIdent is needed. |
|**`context`**|`{String}`|undefined|Context path relative to which libIdent will be generated. If undefined, context from webpack config will be used.|


## But what do we do with this absolute power?

Use it with care. The plugin can be used to solve all kinds of issues not covered by more specific module id plugins but it's also extremely easy to break your bundles by not assigning unique IDs to modules.