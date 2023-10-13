'use strict';
module.exports = {
    root: true,

    parser: '@typescript-eslint/parser',
    parserOptions: {
        tsconfigRootDir: '.',
        project: 'tsconfig.json',
        sourceType: 'module',
        ecmaVersion: 'es2024',
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
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
    },
    overrides: {},
}
