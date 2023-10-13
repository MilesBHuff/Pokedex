'use strict';
module.exports = {
    root: true,
    env: {
        browser: true,
        esnext: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: [
        'dist', 
        '.eslintrc.cjs',
    ],
    parser: '@typescript-eslint/parser',
    plugins: [
        'react-refresh',
    ],
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
    },
}
