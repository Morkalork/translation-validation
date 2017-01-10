import babel from 'rollup-plugin-babel';

// {} []

export default {
    entry: 'index.js',
    plugins: [babel({
        presets: "es2015-rollup",
        babelrc: false
    })],
    targets: [{
        dest: 'bundle.js',
        format: 'cjs'
    }]
};