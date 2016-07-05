var rollupBundler = require('rollup-babel-lib-bundler');

Promise.resolve(rollupBundler({
	name: 'storage',
	moduleName: 'storage',
	dest: 'dist/',
	entry: 'src/module.js',
	format: ['cjs', 'umd', 'es6'],
	postfix: {'cjs': ".common"}
})).then(console.log("Build Complete."));