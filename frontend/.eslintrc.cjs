'use strict';
module.exports = {
    root: true,

    parser: '@typescript-eslint/parser',
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json', './tsconfig.node.json'],
        sourceType: 'module',
        ecmaVersion: 'latest',
        ecmaFeatures: {
            impliedStrict: true,
        },
        createDefaultProgram: true, //BUG:  Workaround for parserOptions.project not working correctly in editors (https://github.com/typescript-eslint/typescript-eslint/issues/864#issuecomment-523213273)
    },
    plugins: [
        'react-refresh',
    ],

    ignorePatterns: [
        '.eslintrc.cjs',
        'dist',
    ],

    env: {
        browser: true,
        esnext: true,
        node: true,
    },
    globals: {},

    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/strict-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
        'plugin:react-hooks/recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
    ],
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            {allowConstantExport: true},
        ],
    },
    overrides: {},
};
