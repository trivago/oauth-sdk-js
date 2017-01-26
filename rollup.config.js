import rollupPluginBabel from 'rollup-plugin-babel';
import rollupPluginUglify from 'rollup-plugin-uglify';

const plugins = [
    rollupPluginBabel()
];

if (process.env.MINIFY) {
    plugins.push(rollupPluginUglify({
        mangle: {
            toplevel: true,
            screw_ie8: true
        },
        compress: {
            screw_ie8: true,
            sequences: true,
            dead_code: true,
            conditionals: true,
            booleans: true,
            evaluate: true,
            loops: true,
            hoist_funs: true,
            unused: true,
            unsafe: true,
            if_return: true,
            join_vars: true,
            drop_console: true,
            cascade: true
        }
    }))
}

export default {
    entry: 'lib/trv.sdk.js',
    format: 'umd',
    dest: 'dist/trv.sdk.js',
    moduleName: 'trvOauthSdk',
    plugins: plugins
}