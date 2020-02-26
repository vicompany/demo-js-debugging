import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const isProduction = process.env.NODE_ENV === 'production';

const INPUT_DIR = 'src/scripts';
const OUTPUT_DIR = 'dist/js';

export default [
	{
		input: `${INPUT_DIR}/main-module.mjs`,

		plugins: [
			resolve(),
			commonjs(),
			isProduction && terser(),
		],

		output: {
			dir: OUTPUT_DIR,
			format: 'es',
			entryFileNames: '[name].mjs',
			chunkFileNames: '[name]-[hash].mjs',
			dynamicImportFunction: '__import__',
			sourcemap: true,
		},
	},
];
